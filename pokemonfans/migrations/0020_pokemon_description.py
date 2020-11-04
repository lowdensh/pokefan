# Generated by Django 3.1.2 on 2020-10-27 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0019_pokemon_type_2'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='description',
            field=models.TextField(blank=True, help_text="Some kind of description for the Pokémon. This could be composed of Pokédex entries, the Pokémon's biology etc."),
        ),
    ]
