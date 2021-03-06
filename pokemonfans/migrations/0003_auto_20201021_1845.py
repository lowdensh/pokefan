# Generated by Django 3.1.2 on 2020-10-21 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0002_auto_20201021_1823'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='image_large',
            field=models.ImageField(null=True, upload_to='pokemon_images', verbose_name='Large Image'),
        ),
        migrations.AddField(
            model_name='pokemon',
            name='name_jp',
            field=models.CharField(default='', max_length=20, unique=True, verbose_name='Japanese Name'),
            preserve_default=False,
        ),
    ]
