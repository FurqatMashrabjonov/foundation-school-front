import React, { useState } from 'react';
import Header from './Header';
import InputField from './InputField';
import SelectField from './SelectField';
import Button from './Button';

const languageOptions = [
  { value: 'english', label: 'Ingliz tili' },
  { value: 'russian', label: 'Rus tili' },
  { value: 'math', label: 'Matematika' },
];

interface FormData {
  name: string;
  phone: string;
  type: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  type?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    type: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ism kiritish majburiy';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon raqam kiritish majburiy';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Yaroqli telefon raqamini kiriting';
    }

    if (!formData.type) {
      newErrors.type = 'Kursni tanlang';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { id: string; value: string }
  ) => {
    const id = 'target' in e ? e.target.id : e.id;
    const value = 'target' in e ? e.target.value : e.value;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };
  const sendToTelegram = async (name: string, phone: string, type: string) => {
    const token = "7554903976:AAG0X_iHH2awFyRjtytbZ1wp25qDKqF_Euw";
    const chatId = "-1002537470117";

    const message = `
📥 *Yangi ro'yxatdan o'tish!*
👤 Ism: *${name}*
📞 Telefon: *${phone}*
📘 Kurs turi: *${type}*
`.trim();

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Telegram API error');
      }
    } catch (error) {
      console.error("Telegram error:", error);
      throw error;
    }
  };

  const sendToBackend = async (name: string, phone: string, type: string) => {
    try {
      await fetch('https://admin.foundation-school.uz/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          course_type: type,
        }),
      });
    } catch (error) {
      console.error('backend error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        await sendToBackend(formData.name, formData.phone, formData.type);
        await sendToTelegram(formData.name, formData.phone, formData.type)

        setIsSubmitting(false);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            phone: '',
            type: '',
          });
        }, 3000);
      } catch (error) {
        console.error('Submission error:', error);
        setIsSubmitting(false);
      }
    }
  };

  return (
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <Header />

        {isSuccess ? (
            <div className="text-center py-8 px-4 bg-green-50 rounded-lg border border-green-100 mb-6 animate-fade-in">
              <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Rahmat!</h3>
              <p className="text-gray-600">
                Ma'lumotlaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.
              </p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                  id="name"
                  label="Ismingiz"
                  type="text"
                  placeholder="Ism sharifingiz"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={errors.name}
              />

              <InputField
                  id="phone"
                  label="Telefon Raqamingiz"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  error={errors.phone}
              />

              <SelectField
                  id="type"
                  label="Kurs Turi"
                  placeholder="Kursni tanlang"
                  options={languageOptions}
                  value={formData.type}
                  onChange={handleChange}
                  required
                  error={errors.type}
              />

              <div className="mt-8">
                <Button type="submit" isLoading={isSubmitting}>
                  {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
                </Button>
              </div>
            </form>
        )}
      </div>
  );
};

export default ContactForm;
