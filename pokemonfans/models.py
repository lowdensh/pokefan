from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.timezone import now


TYPE_CHOICES = [
    ("???",      "???"),
    ("Bug",      "Bug"),
    ("Dark",     "Dark"),
    ("Dragon",   "Dragon"),
    ("Electric", "Electric"),
    ("Fairy",    "Fairy"),
    ("Fighting", "Fighting"),
    ("Fire",     "Fire"),
    ("Flying",   "Flying"),
    ("Ghost",    "Ghost"),
    ("Grass",    "Grass"),
    ("Ground",   "Ground"),
    ("Ice",      "Ice"),
    ("Normal",   "Normal"),
    ("Poison",   "Poison"),
    ("Psychic",  "Psychic"),
    ("Rock",     "Rock"),
    ("Steel",    "Steel"),
    ("Water",    "Water"),
]

AVATAR_CHOICES = [
    ("trainer_images/gen1_female.webp", "Gen I: Leaf (F)"),
    ("trainer_images/gen1_male.webp",   "Gen I: Red (M)"),
    ("trainer_images/gen2_female.webp", "Gen II: Lyra (F)"),
    ("trainer_images/gen2_male.webp",   "Gen II: Ethan (M)"),
    ("trainer_images/gen3_female.webp", "Gen III: May (F)"),
    ("trainer_images/gen3_male.webp",   "Gen III: Brendan (M)"),
    ("trainer_images/gen4_female.webp", "Gen IV: Dawn (F)"),
    ("trainer_images/gen4_male.webp",   "Gen IV: Lucas (M)"),
    ("trainer_images/gen5_female.webp", "Gen V: Hilda (F)"),
    ("trainer_images/gen5_male.webp",   "Gen V: Hilbert (M)"),
]

REGION_CHOICES = [
    ("gen1_kanto",  "Kanto"),
    ("gen2_johto",  "Johto"),
    ("gen3_hoenn",  "Hoenn"),
    ("gen4_sinnoh", "Sinnoh"),
    ("gen5_unova",  "Unova"),
    ("gen6_kalos",  "Kalos"),
    ("gen7_alola",  "Alola"),
    ("gen8_galar",  "Galar"),
]

SERIES_CHOICES = [
    ("gen1_rby",  "Red/Blue/Yellow"),
    ("gen2_gsc",  "Gold/Silver/Crystal"),
    ("gen3_rse",  "Ruby/Sapphire/Emerald"),
    ("gen4_dpp",  "Diamond/Pearl/Platinum"),
    ("gen5_bw",   "Black/White"),
    ("gen6_xy",   "X/Y"),
    ("gen7_sm",   "Sun/Moon"),
    ("gen8_swsh", "Sword/Shield"),
]


class Trainer(models.Model):
    name = models.CharField(
        verbose_name="Display Name",
        help_text="25 characters of whatever you want! This just needs to be unique.",
        max_length=25,
        unique=True
    )
    avatar = models.ImageField(
        choices=AVATAR_CHOICES,
        default="trainer_images/gen1_female.webp"
    )
    join_date = models.DateField(
        verbose_name="Date Joined",
        # This is just to make the field visible in admin edit
        default=now
        # auto_now_add=True
    )
    region = models.CharField(
        verbose_name="Home Region",
        choices=REGION_CHOICES,
        default="gen1_kanto",
        max_length=50
    )
    series = models.CharField(
        verbose_name="Fav Core Series",
        choices=SERIES_CHOICES,
        default="gen1_rby",
        max_length=50
    )

    class Meta:
        ordering = ["join_date", "id"]

    def __str__(self):
        return self.name


class Pokemon(models.Model):
    no = models.PositiveSmallIntegerField(
        verbose_name="National Number",
        help_text="The Pokémon's number in the National Pokédex, without any symbols or leading zeros.",
        unique=True,
        null=False,
        primary_key=True,
        validators=[MinValueValidator(1), MaxValueValidator(893)]
    )
    name = models.CharField(
        verbose_name="English Name",
        max_length=20,
        unique=True
    )
    name_jp = models.CharField(
        verbose_name="Japanese Name",
        help_text=("The Japanese name for the Pokémon, written in katakana. See "
                   "<a href='https://bulbapedia.bulbagarden.net/wiki/List_of_Japanese_Pok%C3%A9mon_names'>"
                   "List of Japanese Pokémon names</a>."),
        max_length=20,
        unique=True
    )
    type_1 = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES
    )
    type_2 = models.CharField(
        help_text="Not all Pokémon are dual-typed. This may be left blank.",
        max_length=10,
        choices=TYPE_CHOICES,
        blank=True
    )
    description = models.TextField(
        help_text=("Some kind of description for the Pokémon. "
                   "This could be composed of Pokédex entries, the Pokémon's biology etc."),
        default="Description"
    )
    image = models.ImageField(
        help_text="Small sprite. See <a href='https://pokemondb.net/sprites'>Pokémon sprite archive</a>.",
        upload_to="pokemon_images",
        default="pokemon_images/default.png",
        blank=True
    )
    image_large = models.ImageField(
        verbose_name="Large Image",
        help_text=("Larger image. See the appropriate "
                   "<a href='https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)'>Bulbapedia page</a>."),
        upload_to="pokemon_images",
        default="pokemon_images/default_large.webp",
        blank=True
    )
    fans = models.ManyToManyField(
        to=Trainer,
        blank=True
    )

    @property
    def number(self):
        return f"#{str(self.no).zfill(3)}"

    @property
    def fan_count(self):
        return self.fans.count()

    @property
    def fan_string(self):
        return "%s (%s)" % (
            self,
            ", ".join(trainer.name for trainer in self.fans.all()),
        )

    class Meta:
        ordering = ["no", "name"]
        verbose_name = "Pokémon"
        verbose_name_plural = "Pokémon"

    def __str__(self):
        return f"{self.number} {self.name}"
