# Generated by Django 3.1.7 on 2021-05-22 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210522_1722'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='sns_type',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
