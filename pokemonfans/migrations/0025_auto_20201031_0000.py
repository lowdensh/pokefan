# Generated by Django 3.1.2 on 2020-10-31 00:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemonfans', '0024_trainer_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainer',
            name='avatar',
            field=models.ImageField(choices=[('gen1_female', 'Gen I: Leaf (F)'), ('gen1_male', 'Gen I: Red (M)'), ('gen2_female', 'Gen II: Lyra (F)'), ('gen2_male', 'Gen II: Ethan (M)'), ('gen3_female', 'Gen III: May (F)'), ('gen3_male', 'Gen III: Brendan (M)'), ('gen4_female', 'Gen IV: Dawn (F)'), ('gen4_male', 'Gen IV: Lucas (M)'), ('gen5_female', 'Gen V: Hilda (F)'), ('gen5_male', 'Gen V: Hilbert (M)')], default='gen1_male', upload_to=''),
        ),
        migrations.AlterField(
            model_name='trainer',
            name='birthday',
            field=models.DateField(default='1986-05-22'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='trainer',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]