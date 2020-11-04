# Generated by Django 3.1.2 on 2020-10-31 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0029_auto_20201031_1244'),
    ]

    operations = [
        migrations.AddField(
            model_name='trainer',
            name='series',
            field=models.CharField(choices=[('gen1_rby', 'Red/Blue/Yellow'), ('gen2_gsc', 'Gold/Silver/Crystal'), ('gen3_rse', 'Ruby/Sapphire/Emerald'), ('gen4_dpp', 'Diamond/Pearl/Platinum'), ('gen5_bw', 'Black/White'), ('gen6_xy', 'X/Y'), ('gen7_sm', 'Sun/Moon'), ('gen8_swsh', 'Sword/Shield')], default='gen1_rby', max_length=50, verbose_name='Favourite Series'),
        ),
        migrations.AlterField(
            model_name='trainer',
            name='region',
            field=models.CharField(choices=[('gen1_kanto', 'Kanto'), ('gen2_johto', 'Johto'), ('gen3_hoenn', 'Hoenn'), ('gen4_sinnoh', 'Sinnoh'), ('gen5_unova', 'Unova'), ('gen6_kalos', 'Kalos'), ('gen7_alola', 'Alola'), ('gen8_galar', 'Galar')], default='gen1_kanto', max_length=50, verbose_name='Home Region'),
        ),
    ]
