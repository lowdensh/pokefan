# Generated by Django 3.1.2 on 2020-10-31 00:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0025_auto_20201031_0000'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainer',
            name='birthday',
        ),
        migrations.AddField(
            model_name='trainer',
            name='join_date',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Date Joined'),
            preserve_default=False,
        ),
    ]
