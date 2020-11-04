# Generated by Django 3.1.2 on 2020-10-30 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0023_auto_20201029_2317'),
    ]

    operations = [
        migrations.AddField(
            model_name='trainer',
            name='avatar',
            field=models.ImageField(choices=[('gen1_female', 'Gen I:   Leaf (F)'), ('gen1_male', 'Gen I:   Red (M)'), ('gen2_female', 'Gen II:  Lyra (F)'), ('gen2_male', 'Gen II:  Ethan (M)'), ('gen3_female', 'Gen III: May (F)'), ('gen3_male', 'Gen III: Brendan (M)'), ('gen4_female', 'Gen IV:  Dawn (F)'), ('gen4_male', 'Gen IV:  Lucas (M)'), ('gen5_female', 'Gen V:   Hilda (F)'), ('gen5_male', 'Gen V:   Hilbert (M)')], default='gen1_male', upload_to=''),
        ),
    ]