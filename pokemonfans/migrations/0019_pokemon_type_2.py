# Generated by Django 3.1.2 on 2020-10-27 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0018_remove_pokemon_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='type_2',
            field=models.CharField(blank=True, choices=[('???', '???'), ('Bug', 'Bug'), ('Dark', 'Dark'), ('Dragon', 'Dragon'), ('Electric', 'Electric'), ('Fairy', 'Fairy'), ('Fighting', 'Fighting'), ('Fire', 'Fire'), ('Flying', 'Flying'), ('Ghost', 'Ghost'), ('Grass', 'Grass'), ('Ground', 'Ground'), ('Ice', 'Ice'), ('Normal', 'Normal'), ('Poison', 'Poison'), ('Psychic', 'Psychic'), ('Rock', 'Rock'), ('Steel', 'Steel'), ('Water', 'Water')], help_text='Not all Pokémon are dual-typed. This may be left blank.', max_length=10),
        ),
    ]
