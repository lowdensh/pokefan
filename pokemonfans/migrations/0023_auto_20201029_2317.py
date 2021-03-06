# Generated by Django 3.1.2 on 2020-10-29 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0022_auto_20201027_2058'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='description',
            field=models.TextField(default='Description', help_text="Some kind of description for the Pokémon. This could be composed of Pokédex entries, the Pokémon's biology etc."),
        ),
    ]
