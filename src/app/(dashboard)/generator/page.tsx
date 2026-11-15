// src/app/(dashboard)/generator/page.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client'; // Ajusta esta ruta según tu cliente de Supabase

interface GeneratorFormValues {
  productName: string;
  tone: string;
  platform: string;
  image: FileList | null;
}

const TONES = [
  { label: 'Profesional', value: 'professional' },
  { label: 'Persuasivo', value: 'persuasive' },
  { label: 'Divertido / Casual', value: 'casual' },
  { label: 'Urgente / Oferta', value: 'urgent' },
];

const PLATFORMS = [
  { label: 'Shopify / E-commerce', value: 'shopify' },
  { label: 'Instagram / Redes Sociales', value: 'instagram' },
  { label: 'Facebook Ad', value: 'facebook_ad' },
  { label: 'TikTok Caption', value: 'tiktok' },
];

export default function GeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const supabase = createClient();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GeneratorFormValues>({
    defaultValues: {
      tone: 'professional',
      platform: 'shopify',
    },
  });

  const selectedImageFile = watch('image');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setValue('image', files);
      const previewUrl = URL.createObjectURL(files[0]);
      setImagePreview(previewUrl);
    }
  };

  const onSubmit = async (data: GeneratorFormValues) => {
    setLoading(true);
    setResult(null);

    try {
      let imageUrl = null;

      // Opcional: Subir imagen a Supabase Storage si se seleccionó un archivo
      if (data.image && data.image[0]) {
        setUploadingImage(true);
        const file = data.image[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36.substring(2))}-${Date.now()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('generations') // Reemplaza con el nombre de tu bucket
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Error al subir la imagen: ${uploadError.message}`);
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from('generations').getPublicUrl(filePath);

        imageUrl = publicUrl;
        setUploadingImage(false);
      }

      // TODO: Aquí llamarías a tu API route o función de backend para generar el contenido
      // Ejemplo simulado de llamada:
      // const response = await fetch('/api/generate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     productName: data.productName,
      //     tone: data.tone,
      //     platform: data.platform,
      //     imageUrl,
      //   }),
      // });
      // const resultData = await response.json();

      // Simulación de respuesta exitosa para demostración
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setResult(
        `¡Contenido generado exitosamente para "${data.productName}" en formato ${data.platform} con tono ${data.tone}!`
      );
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Ocurrió un error al procesar la solicitud.');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Generador de Contenido</h1>
        <p className="text-sm text-gray-600">
          Crea copias y descripciones optimizadas para tus productos en segundos.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Nombre del producto */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <input
            id="productName"
            type="text"
            placeholder="Ej. Zapatillas deportivas ultraligeras"
            className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
              errors.productName
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-gray-900 focus:ring-gray-200'
            }`}
            {...register('productName', {
              required: 'El nombre del producto es obligatorio.',
            })}
          />
          {errors.productName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Selectores: Tono y Plataforma */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Tono */}
          <div>
            <label
              htmlFor="tone"
              className="block text-sm font-medium text-gray-700"
            >
              Tono de voz
            </label>
            <select
              id="tone"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
              {...register('tone')}
            >
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Plataforma */}
          <div>
            <label
              htmlFor="platform"
              className="block text-sm font-medium text-gray-700"
            >
              Plataforma de destino
            </label>
            <select
              id="platform"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
              {...register('platform')}
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input de Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagen del producto (Opcional)
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-4 text-sm font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">
              <span>Seleccionar archivo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {imagePreview && (
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-gray-950 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading
              ? uploadingImage
                ? 'Subiendo imagen...'
                : 'Generando...'
              : 'Generar Contenido'}
          </button>
        </div>
      </form>

      {/* Resultados */}
      {result && (
        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
          <h3 className="text-lg font-medium text-green-900">Resultado</h3>
          <p className="mt-2 text-sm text-green-800">{result}</p>
        </div>
      )}
    </div>
  );
}