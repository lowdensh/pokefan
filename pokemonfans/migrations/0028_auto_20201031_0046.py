# Generated by Django 3.1.2 on 2020-10-31 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0027_auto_20201031_0017'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pokemon',
            name='edit_date',
        ),
        migrations.AlterField(
            model_name='trainer',
            name='name',
            field=models.CharField(help_text='50 characters of whatever you want! This just needs to be unique.', max_length=50, unique=True, verbose_name='Display Name'),
        ),
    ]
