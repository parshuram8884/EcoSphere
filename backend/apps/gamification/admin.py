from django.contrib import admin
from .models import Challenge, ChallengeParticipation, Badge, EmployeeBadge, Reward, RewardRedemption


@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty', 'xp', 'deadline', 'status')
    list_filter = ('status', 'difficulty')
    search_fields = ('title', 'description')
    list_editable = ('xp', 'status')
    raw_id_fields = ('category',)


@admin.register(ChallengeParticipation)
class ChallengeParticipationAdmin(admin.ModelAdmin):
    list_display = ('challenge', 'employee', 'progress', 'approval_status', 'xp_awarded')
    list_filter = ('approval_status',)
    list_editable = ('approval_status', 'xp_awarded')
    raw_id_fields = ('challenge', 'employee')


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(EmployeeBadge)
class EmployeeBadgeAdmin(admin.ModelAdmin):
    list_display = ('employee', 'badge', 'earned_at')
    raw_id_fields = ('employee', 'badge')


@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    list_display = ('name', 'points_required', 'stock', 'status')
    list_filter = ('status',)
    list_editable = ('points_required', 'stock', 'status')


@admin.register(RewardRedemption)
class RewardRedemptionAdmin(admin.ModelAdmin):
    list_display = ('employee', 'reward', 'points_deducted', 'redeemed_at')
    raw_id_fields = ('employee', 'reward')
from django.contrib import admin

# Register your models here.
