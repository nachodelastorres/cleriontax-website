"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from 'next-intl';
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/contact/FileUpload";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<FormStatus>("idle");
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(t('submitError'));
      }

      setStatus("success");
      reset();
      setFile(null);

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");

      // Reset error message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={t('name')}
        placeholder={t('namePlaceholder')}
        required
        {...register("name")}
        error={errors.name?.message}
        disabled={status === "submitting"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('email')}
          type="email"
          placeholder={t('emailPlaceholder')}
          required
          {...register("email")}
          error={errors.email?.message}
          disabled={status === "submitting"}
        />

        <Input
          label={t('phone')}
          type="tel"
          placeholder={t('phonePlaceholder')}
          required
          {...register("phone")}
          error={errors.phone?.message}
          disabled={status === "submitting"}
        />
      </div>

      <Textarea
        label={t('message')}
        placeholder={t('messagePlaceholder')}
        rows={6}
        required
        {...register("message")}
        error={errors.message?.message}
        disabled={status === "submitting"}
      />

      <FileUpload onFileSelect={setFile} />

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <p className="text-sm text-green-800">
            {t('successMessage')}
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <p className="text-sm text-red-800">
            {t('errorMessage')}
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            {t('submitting')}
          </>
        ) : (
          <>
            {t('submit')}
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-xs text-neutral-500 text-center">
        {t('privacyText')}{" "}
        <a href="/privacidad" className="text-accent hover:underline">
          {t('privacyLink')}
        </a>
      </p>
    </form>
  );
}
