# Generated by Django 3.1.2 on 2020-10-27 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0016_pokemon_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='type_1',
            field=models.CharField(choices=[('???', '???'), ('Bug', 'Bug'), ('Dark', 'Dark'), ('Dragon', 'Dragon'), ('Electric', 'Electric'), ('Fairy', 'Fairy'), ('Fighting', 'Fighting'), ('Fire', 'Fire'), ('Flying', 'Flying'), ('Ghost', 'Ghost'), ('Grass', 'Grass'), ('Ground', 'Ground'), ('Ice', 'Ice'), ('Normal', 'Normal'), ('Poison', 'Poison'), ('Psychic', 'Psychic'), ('Rock', 'Rock'), ('Steel', 'Steel'), ('Water', 'Water')], max_length=10),
        ),
    ]
