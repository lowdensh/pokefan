# Generated by Django 3.1.2 on 2020-10-21 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0003_auto_20201021_1845'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='image_large',
            field=models.ImageField(blank=True, null=True, upload_to='pokemon_images', verbose_name='Large Image'),
        ),
    ]
