# -*- coding: utf-8 -*-
from django.db import migrations
from django.db.backends.postgresql_psycopg2.schema import DatabaseSchemaEditor
from django.db.migrations.state import StateApps

from zerver.lib.cache import delete_user_profile_caches

def clear_user_profiles_caches(apps: StateApps, schema_editor: DatabaseSchemaEditor) -> None:
    UserProfile = apps.get_model('zerver', 'UserProfile')
    delete_user_profile_caches(UserProfile.objects.all())

class Migration(migrations.Migration):

    dependencies = [
        ('zerver', '0255_userprofile_add_personal_recipient_column'),
    ]

    operations = [
        migrations.RunSQL(
            """
            UPDATE zerver_userprofile
            SET personal_recipient_id = zerver_recipient.id
            FROM zerver_recipient
            WHERE zerver_recipient.type_id = zerver_userprofile.id AND zerver_recipient.type = 1;
            """,
            reverse_sql='UPDATE zerver_userprofile SET personal_recipient_id = NULL'),
        migrations.RunPython(clear_user_profiles_caches, reverse_code=migrations.RunPython.noop),
    ]
