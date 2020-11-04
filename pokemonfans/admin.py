from django.contrib import admin
from .models import Trainer, Pokemon


class TrainerAdmin(admin.ModelAdmin):
    list_display = ("name", "join_date")


class PokemonAdmin(admin.ModelAdmin):
    list_display = ("number", "name", "fan_count")


admin.site.register(Trainer, TrainerAdmin)
admin.site.register(Pokemon, PokemonAdmin)
