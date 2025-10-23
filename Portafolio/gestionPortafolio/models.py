from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class Perfil(models.Model):
    nombres = models.CharField(max_length=50,blank=True, null=True)
    fecha = models.DateField(null=True, blank=True)
    edad = models.IntegerField()
    direccion = models.CharField(max_length=50,blank=True, null=True)
    resumen = models.CharField(max_length=1000,blank=True, null=True)
    email = models.CharField(max_length=50,blank=True, null=True)
    telefono = models.CharField(max_length=20,blank=True, null=True)
    imagen = models.ImageField(upload_to='perfil', null=True, blank=True)
    curriculum = models.FileField(upload_to='curriculum', null=True, blank=True)
    website =  models.URLField(null=True, blank=True)
    freelance = models.BooleanField(default=True)
    titulo = models.CharField(max_length=50,blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "perfil"
        verbose_name_plural = "perfiles"
        
    def __str__(self):
        return self.nombres


class Experiencia(models.Model):
    estatus = models.CharField(max_length=15,blank=True, null=True)
    cargo = models.CharField(max_length=50,blank=True, null=True)
    ano = models.IntegerField()
    temporada = models.CharField(max_length=25,blank=True, null=True)
    empresa = models.CharField(max_length=50,blank=True, null=True)
    funciones = models.CharField(max_length=200,blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "experiencia"
        verbose_name_plural = "experiencia"
        
    def __str__(self):
        return self.cargo
    

class Educacion(models.Model):
    estatus = models.CharField(max_length=15,blank=True, null=True)
    titulo = models.CharField(max_length=100,blank=True, null=True)
    ano = models.IntegerField()
    instituto = models.CharField(max_length=50,blank=True, null=True)
    descripcion = models.CharField(max_length=200,blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "educacion"
        verbose_name_plural = "educaciones"
        
    def __str__(self):
        return self.titulo
    
    
class Categoria(models.Model):
    nombre = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "categoria"
        verbose_name_plural = "categorias"
        
    def __str__(self):
        return self.nombre
    
class Lenguaje(models.Model):
    nombre = models.CharField(max_length=50)
    imagen = models.ImageField(upload_to='images/tecnologia', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "lenguaje"
        verbose_name_plural = "lenguajes"
        
    def __str__(self):
        return self.nombre
    
class Proyecto(models.Model):
    estatus = models.CharField(max_length=15,blank=True, null=True)
    nombre = models.CharField(max_length=50,blank=True, null=True)
    resumen = models.CharField(max_length=400,blank=True, null=True)
    lenguajes = models.ManyToManyField(Lenguaje)
    cliente = models.CharField(max_length=50,blank=True, null=True)
    categorias = models.ManyToManyField(Categoria)
    imagen = models.ImageField(upload_to='images/project', null=True, blank=True)
    url = models.CharField(max_length=70,blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "proyecto"
        verbose_name_plural = "proyectos"
        
    def __str__(self):
        return self.nombre
    
    
class Contador(models.Model):
    valor = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "contador"
        verbose_name_plural = "contadores"
        
    def __str__(self):
        return self.valor
    
    
class Visitantes(models.Model):
    ip = models.CharField(max_length=50)
    pais = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "visita"
        verbose_name_plural = "visitantes"

    def __str__(self):
        return f'Dirección IP: {self.ip} - País: {self.pais} - Fecha: {self.created}'
    
    
class RedesSociales(models.Model):
    estatus = models.CharField(max_length=15,blank=True, null=True)
    nombre = models.CharField(max_length=50)
    link = models.CharField(max_length=100)
    icono = models.CharField(max_length=70)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "red_social"
        verbose_name_plural = "redes_sociales"
        
        