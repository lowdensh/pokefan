from .models import Trainer, Pokemon
from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt
import json


def index(request):
    template = "pokemonfans/index.html"
    context = {
        "pokemon_list": Pokemon.objects.all(),
        "trainer_list": Trainer.objects.all()
    }
    return render(request, template, context)


# <!--==========================================================================
#     SECTION 1
#     POKÉMON
# ============================================================================-->

# POST/ADD Pokémon
@csrf_exempt
def pokemon_api_add(request):
    try:
        if request.method == "POST":
            # Create a new Pokemon object
            # The string in get() must match data attributes in Ajax request
            # NOT name attributes in HTML form elements
            pokemon = Pokemon.objects.create(
                no=request.POST.get("no"),
                name=request.POST.get("name"),
                name_jp=request.POST.get("name_jp"),
                type_1=request.POST.get("type_1"),
                type_2=request.POST.get("type_2"),
                description=request.POST.get("description"),
            )
            # Send back the new Pokemon object info so we can add it to the page
            data = {
                "success": True,
                "pokemon": {
                    "no": pokemon.no,
                    "number": pokemon.number,
                    "name": pokemon.name,
                    "name_jp": pokemon.name_jp,
                    "type_1": pokemon.type_1,
                    "type_2": pokemon.type_2,
                    "description": pokemon.description
                }
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Exception:
        return HttpResponseBadRequest("Bad request")


# GET Pokémon
@csrf_exempt
def pokemon_api_get(request, poke_no):
    try:
        if request.method == "GET":
            pokemon = Pokemon.objects.get(no=poke_no)
            data = {
                "success": True,
                "pokemon": {
                    "no": pokemon.no,
                    "name": pokemon.name,
                    "name_jp": pokemon.name_jp,
                    "type_1": pokemon.type_1,
                    "type_2": pokemon.type_2,
                    "description": pokemon.description,
                    "image_url": pokemon.image.url
                },
                "fans": {
                    "count": pokemon.fan_count,
                    "trainers": [trainer.name for trainer in pokemon.fans.all()]
                }
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Pokemon.DoesNotExist:
        return HttpResponseBadRequest("Invalid Pokémon No")


# PUT/EDIT Pokémon
@csrf_exempt
def pokemon_api_edit(request, poke_no):
    try:
        if request.method == "PUT":
            pokemon = Pokemon.objects.get(no=poke_no)

            json_data = json.loads(request.body)
            pokemon.name = json_data["name"]
            pokemon.name_jp = json_data["name_jp"]
            pokemon.type_1 = json_data["type_1"]
            pokemon.type_2 = json_data["type_2"]
            pokemon.description = json_data["description"]
            pokemon.save()

            # Send back the edited Pokemon object info so we can change what was on the page
            data = {
                "success": True,
                "pokemon": {
                    "no": pokemon.no,
                    "name": pokemon.name,
                    "name_jp": pokemon.name_jp,
                    "type_1": pokemon.type_1,
                    "type_2": pokemon.type_2,
                    "description": pokemon.description
                }
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Pokemon.DoesNotExist:
        return HttpResponseBadRequest("Invalid Pokémon No")


# DELETE Pokémon
@csrf_exempt
def pokemon_api_delete(request, poke_no):
    try:
        if request.method == "DELETE":
            pokemon = Pokemon.objects.get(no=poke_no)
            pokemon.delete()
            data = {
                "success": True
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Pokemon.DoesNotExist:
        return HttpResponseBadRequest("Invalid Pokémon No")


# <!--==========================================================================
#     SECTION 2
#     TRAINER
# ============================================================================-->

# POST/ADD Trainer
@csrf_exempt
def trainer_api_add(request):
    try:
        if request.method == "POST":
            json_data = json.loads(request.body)

            # Create a new Trainer object
            # The string in get() must match data attributes in Ajax request
            # NOT name attributes in HTML form elements
            trainer = Trainer.objects.create(
                name=json_data["name"],
                avatar=json_data["avatar"],
                region=json_data["region"],
                series=json_data["series"],
            )
            # Must call save() to be able to do things like change the pokemon_set...
            trainer.save()

            # Build an array of Pokemon objects
            new_mons = []
            for no in json_data["mons"]:
                new_mons.append(Pokemon.objects.get(no=int(no)))

            # Make this trainer a fan of them all!
            trainer.pokemon_set.set(new_mons)

            # Send back the new Trainer object info so we can add it to the page
            data = {
                "success": True,
                "trainer": {
                    "id": trainer.id,
                    "name": trainer.name,
                    "avatar_url": trainer.avatar.url,
                    "join_date": trainer.join_date,
                    "region": trainer.get_region_display(),
                    "series": trainer.get_series_display()
                }
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Exception:
        return HttpResponseBadRequest("Bad request")


# PUT/EDIT Trainer
@csrf_exempt
def trainer_api_edit(request, id):
    try:
        if request.method == "PUT":
            trainer = Trainer.objects.get(id=id)

            json_data = json.loads(request.body)

            trainer.name = json_data["name"]
            trainer.avatar = json_data["avatar"]
            trainer.region = json_data["region"]
            trainer.series = json_data["series"]

            # Build an array of Pokemon objects
            new_mons = []
            for no in json_data["mons"]:
                new_mons.append(Pokemon.objects.get(no=int(no)))

            # Make this trainer a fan of them all!
            trainer.pokemon_set.set(new_mons)

            trainer.save()

            # Send back the new Trainer object info so we can add it to the page
            data = {
                "success": True,
                "trainer": {
                    "id": trainer.id,
                    "name": trainer.name,
                    "avatar_url": trainer.avatar.url,
                    "join_date": trainer.join_date,
                    "region": trainer.get_region_display(),
                    "series": trainer.get_series_display()
                }
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Exception:
        return HttpResponseBadRequest("Bad request")


# GET Trainer
@csrf_exempt
def trainer_api_get(request, id):
    try:
        if request.method == "GET":
            trainer = Trainer.objects.get(id=id)
            data = {
                "success": True,
                "trainer": {
                    "id": trainer.id,
                    "name": trainer.name,
                    "avatar_url": trainer.avatar.url,
                    "join_date": trainer.join_date,
                    "region": trainer.get_region_display(),
                    "series": trainer.get_series_display()
                },
                "pokemon_urls": [pokemon.image.url for pokemon in trainer.pokemon_set.all()]
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Pokemon.DoesNotExist:
        return HttpResponseBadRequest("Invalid Trainer ID")


# DELETE Trainer
@csrf_exempt
def trainer_api_delete(request, id):
    try:
        if request.method == "DELETE":
            trainer = Trainer.objects.get(id=id)
            trainer.delete()
            data = {
                "success": True
            }
            return JsonResponse(data)

        return HttpResponseBadRequest("Invalid HTTP method")

    except Pokemon.DoesNotExist:
        return HttpResponseBadRequest("Invalid Pokémon No")
