from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),

    path("api/pokemon/add", views.pokemon_api_add, name="pokemon api add"),
    path("api/pokemon/get/<int:poke_no>", views.pokemon_api_get, name="pokemon api get"),
    path("api/pokemon/edit/<int:poke_no>", views.pokemon_api_edit, name="pokemon api edit"),
    path("api/pokemon/delete/<int:poke_no>", views.pokemon_api_delete, name="pokemon api delete"),

    path("api/trainer/add", views.trainer_api_add, name="trainer api add"),
    path("api/trainer/get/<int:id>", views.trainer_api_get, name="trainer api get"),
    path("api/trainer/edit/<int:id>", views.trainer_api_edit, name="trainer api edit"),
    path("api/trainer/delete/<int:id>", views.trainer_api_delete, name="trainer api delete"),
]
