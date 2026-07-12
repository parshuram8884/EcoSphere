from django.apps import AppConfig


class GovernanceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.governance'

    def ready(self):
        import apps.governance.signals
