from rest_framework import serializers
from .models import Challenge, ChallengeParticipation, Badge, EmployeeBadge, Reward, RewardRedemption
from apps.settings_admin.models import FeatureToggle

class ChallengeSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Challenge
        fields = ['id', 'title', 'category', 'category_name', 'description', 'xp', 'difficulty', 'evidence_required', 'deadline', 'status']

class ChallengeParticipationSerializer(serializers.ModelSerializer):
    challenge_title = serializers.ReadOnlyField(source='challenge.title')
    employee_name = serializers.SerializerMethodField()

    class Meta:
        model = ChallengeParticipation
        fields = ['id', 'challenge', 'challenge_title', 'employee', 'employee_name', 'progress', 'proof', 'approval_status', 'xp_awarded', 'completion_date']

    def get_employee_name(self, obj):
        return obj.employee.user.get_full_name() or obj.employee.user.username

    def validate(self, data):
        status = data.get('approval_status')
        challenge = data.get('challenge') or (self.instance.challenge if self.instance else None)
        
        toggle = FeatureToggle.objects.first()
        evidence_required = (challenge.evidence_required if challenge else False) or (toggle.evidence_requirement if toggle else True)

        if status == 'approved' and evidence_required:
            proof_file = data.get('proof') or (self.instance.proof if self.instance else None)
            if not proof_file:
                raise serializers.ValidationError({"proof": "Evidence/Proof file is required before approval."})
        return data

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'description', 'unlock_rule', 'icon']

class EmployeeBadgeSerializer(serializers.ModelSerializer):
    badge_name = serializers.ReadOnlyField(source='badge.name')
    badge_description = serializers.ReadOnlyField(source='badge.description')

    class Meta:
        model = EmployeeBadge
        fields = ['id', 'employee', 'badge', 'badge_name', 'badge_description', 'earned_at']

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = ['id', 'name', 'description', 'points_required', 'stock', 'status']

class RewardRedemptionSerializer(serializers.ModelSerializer):
    reward_name = serializers.ReadOnlyField(source='reward.name')
    employee_name = serializers.SerializerMethodField()

    class Meta:
        model = RewardRedemption
        fields = ['id', 'employee', 'reward', 'reward_name', 'points_deducted', 'redeemed_at']
        read_only_fields = ['points_deducted']

    def get_employee_name(self, obj):
        return obj.employee.user.get_full_name() or obj.employee.user.username

    def validate(self, data):
        reward = data.get('reward')
        employee = data.get('employee')

        if reward.stock <= 0:
            raise serializers.ValidationError({"reward": "This reward is currently out of stock."})
        if reward.status != 'active':
            raise serializers.ValidationError({"reward": "This reward is currently inactive."})
        if employee.points < reward.points_required:
            raise serializers.ValidationError({"employee": f"Insufficient points balance. Required: {reward.points_required}, Available: {employee.points}."})
        
        return data
