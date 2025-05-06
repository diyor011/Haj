import React, { useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BsBuildings } from 'react-icons/bs';
import { IoCallOutline } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import { QRCodeCanvas } from 'qrcode.react';
import 'react-toastify/dist/ReactToastify.css';

const Badge = () => {
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    surname: '',
    country: '',
    birthday: '',
    id_pass: '',
    phone: '',
    id_badge: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    if (!image) return toast.error('Rasm tanlanmagan');

    setLoading(true);
    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      form.append(key, val);
    });
    form.append('user_image', image);

    try {
      const res = await fetch('https://hajgov.com/api/qr-register/', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Xatolik yuz berdi');
      }

      const data = await res.json();
      const qrImgPath = data.id_card.qr_image;
      const qrFullUrl = `https://hajgov.com${qrImgPath}`;
      setQrCodeUrl(qrFullUrl);

      toast.success("QR Code tayyor!");
    } catch (err) {
      toast.error("Xatolik: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#EEAECA] to-[#94BBE9] px-4 py-4 rounded-2xl mt-8 max-w-3xl mx-auto">
        <div className="flex justify-between">
          <img src="/bage-icon1.png" alt="" className="w-16 h-14" />
          <div className="flex flex-col justify-center bg-amber-700 items-center pt-8 pb-6 px-4 mx-4">
            <p className="text-white">بطاقة شك</p>
            <p className="text-white">nusik Card</p>
            <div onClick={() => fileInputRef.current.click()} className="cursor-pointer">
              {image ? (
                <img src={URL.createObjectURL(image)} className="w-24 h-24 object-cover" alt="Uploaded" />
              ) : (
                <p className="text-9xl text-white"><FaUserAlt /></p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex items-center flex-col">
            <img src="/bage-icon2.png" className="w-16 h-14" alt="" />
          </div>
        </div>

        <div className="flex flex-col items-center py-4 gap-2 pl-4">
          <input name="first_name" value={formData.first_name} onChange={handleChange} type="text" placeholder="Ism"
            className="w-[40%] px-4 py-1 font-bold border border-gray-300 rounded-md text-black outline-none" />
          <input name="last_name" value={formData.last_name} onChange={handleChange} type="text" placeholder="Familiya"
            className="w-[40%] px-4 py-1 font-bold border border-gray-300 rounded-md text-black outline-none" />
          <input name="surname" value={formData.surname} onChange={handleChange} type="text" placeholder="Otasini ismi"
            className="w-[40%] px-4 py-1 font-bold border border-gray-300 rounded-md text-black outline-none" />
        </div>

        <div className="w-full flex gap-4 mt-4">
          <div className="w-1/2 border-amber-700 rounded-lg border flex flex-col items-center py-2">
            <p className="text-amber-700 text-sm">DoB | تاريخ الميلاد</p>
            <input name="birthday" value={formData.birthday} onChange={handleChange}
              className="w-4/5 text-black font-semibold border-none outline-none text-center"
              type="text" placeholder="1958-11-25" />
          </div>
          <div className="w-1/2 border-amber-700 rounded-lg border flex flex-col items-center py-2">
            <p className="text-amber-700 text-sm">Passport | رقم الجواز</p>
            <input name="id_pass" value={formData.id_pass} onChange={handleChange}
              className="w-4/5 text-black font-semibold border-none outline-none text-center"
              type="text" placeholder="AA1234567" />
          </div>
        </div>

        <div className="border-amber-700 border rounded-lg mt-4 py-2 px-3">
          <p className="text-sm text-orange-700 font-semibold text-center mb-2">Aloqa maʼlumotlari</p>
          <div className="flex items-center gap-2 justify-end">
            <input name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="Telefon raqam"
              className="w-full text-black border-none outline-none text-right" />
            <IoCallOutline className="text-black" />
          </div>
          <div className="flex items-center gap-2 justify-end mt-2">
            <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="Davlat"
              className="w-full text-black border-none outline-none text-right" />
            <BsBuildings className="text-black" />
          </div>
        </div>

        <div className="flex justify-between items-start mt-4 gap-4">
          <input
            name="id_badge"
            value={formData.id_badge}
            onChange={handleChange}
            type="text"
            placeholder="18030-03-0980"
            className="text-black border border-gray-300 px-2 py-1 rounded outline-none w-1/2"
          />

          {qrCodeUrl && (
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white p-2 rounded shadow-md">
                <QRCodeCanvas value={qrCodeUrl} size={100} />
              </div>
              <button
                onClick={handleDownloadQR}
                className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700 text-sm"
              >
                QR-ni yuklab olish
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn bg-gradient-to-r from-[#EEAECA] to-[#94BBE9] px-4 py-2 rounded-md font-semibold disabled:opacity-50"
        >
          {loading ? 'Yuklanmoqda...' : 'Maʼlumotni yuborish'}
        </button>
      </div>

      <ToastContainer position="top-center" />
      
    </div>
  );
};

export default Badge;
