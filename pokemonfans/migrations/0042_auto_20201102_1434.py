# Generated by Django 3.1.2 on 2020-11-02 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0041_auto_20201102_1431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='image',
            field=models.ImageField(blank=True, default='pokemon_images/default.png', help_text="Small sprite. See <a href='https://pokemondb.net/sprites'>Pokémon sprite archive</a>.", upload_to='pokemon_images'),
        ),
        migrations.AlterField(
            model_name='pokemon',
            name='image_large',
            field=models.ImageField(blank=True, default='pokemon_images/default_large.webp', help_text="Larger image. See the appropriate <a href='https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)'>Bulbapedia page</a>.", upload_to='pokemon_images', verbose_name='Large Image'),
        ),
    ]
