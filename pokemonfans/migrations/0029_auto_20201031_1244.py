# Generated by Django 3.1.2 on 2020-10-31 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0028_auto_20201031_0046'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainer',
            name='email',
        ),
        migrations.AddField(
            model_name='trainer',
            name='region',
            field=models.ImageField(choices=[('Kanto', 'Kanto (RBY)'), ('Johto', 'Johto (GSC)'), ('Hoenn', 'Hoenn (RSE)'), ('Sinnoh', 'Sinnoh (DPP)'), ('Unova', 'Unova (BW)'), ('Kalos', 'Kalos (XY)'), ('Alola', 'Alola (SM)'), ('Galar', 'Galar (SS)')], default='Kanto', upload_to='', verbose_name='Home Region'),
        ),
    ]
