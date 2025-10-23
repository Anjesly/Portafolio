from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Perfil, Experiencia, Educacion, Categoria, Proyecto, Lenguaje, Contador, Visitantes, RedesSociales

# Register your models here.

class PerfilAdmin(admin.ModelAdmin):
    readonly_fields = ("created", "updated")
    
    
class ExperienciaAdmin(admin.ModelAdmin):
    readonly_fields = ("created", "updated")
    
    
class EducacionAdmin(admin.ModelAdmin):
    readonly_fields = ("created", "updated")
    
    
class CategoriaAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    
    
class LenguajeAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    
    
class ProyectoAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    

class ContadorAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    

class VisitantesAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    
    
class RedesSocialesAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'link', 'icono')
    
    
admin.site.register(Perfil, PerfilAdmin)
admin.site.register(Experiencia, ExperienciaAdmin)
admin.site.register(Educacion, EducacionAdmin)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Lenguaje, LenguajeAdmin)
admin.site.register(Proyecto, ProyectoAdmin)
admin.site.register(Contador, ContadorAdmin)
admin.site.register(Visitantes, VisitantesAdmin)
admin.site.register(RedesSociales, RedesSocialesAdmin)
