from django.db import models

class Challenge(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('under_review', 'Under Review'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=255)
    category = models.ForeignKey('settings_admin.Category', on_delete=models.SET_NULL, null=True, limit_choices_to={'type': 'challenge'})
    description = models.TextField()
    xp = models.IntegerField(default=0)
    difficulty = models.CharField(max_length=50, choices=DIFFICULTY_CHOICES, default='medium')
    evidence_required = models.BooleanField(default=False)
    deadline = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='draft')

    def __str__(self):
        return self.title

class ChallengeParticipation(models.Model):
    APPROVAL_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name='participations')
    employee = models.ForeignKey('authentication.Employee', on_delete=models.CASCADE, related_name='challenge_participations')
    progress = models.IntegerField(default=0) 
    proof = models.FileField(upload_to='proofs/challenges/', null=True, blank=True)
    approval_status = models.CharField(max_length=50, choices=APPROVAL_CHOICES, default='pending')
    xp_awarded = models.IntegerField(default=0)
    completion_date = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ('challenge', 'employee')

    def __str__(self):
        return f"{self.employee.user.username} in {self.challenge.title} ({self.approval_status})"

class Badge(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    unlock_rule = models.JSONField(default=dict, blank=True)
    icon = models.ImageField(upload_to='badges/', null=True, blank=True)

    def __str__(self):
        return self.name

class EmployeeBadge(models.Model):
    employee = models.ForeignKey('authentication.Employee', on_delete=models.CASCADE, related_name='badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, related_name='earned_by')
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('employee', 'badge')

    def __str__(self):
        return f"{self.employee.user.username} earned {self.badge.name}"

class Reward(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    points_required = models.IntegerField()
    stock = models.IntegerField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='active')

    def __str__(self):
        return f"{self.name} ({self.points_required} pts)"

class RewardRedemption(models.Model):
    employee = models.ForeignKey('authentication.Employee', on_delete=models.CASCADE, related_name='redemptions')
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE, related_name='redemptions')
    points_deducted = models.IntegerField()
    redeemed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.user.username} redeemed {self.reward.name}"
