// Mengimpor hook useEffect dan useState dari React serta font Inter dari Google Fonts
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';

// Mengonfigurasi font Inter untuk digunakan
const inter = Inter({ subsets: ['latin'] });

// Komponen fungsional utama dari halaman Next.js
export default function Home() {
  // Hook useState untuk mengelola state hasil lemparan koin dan hasil yang paling sering muncul
  const [hasil, setHasil] = useState([]);
  const [palingBanyak, setPalingBanyak] = useState('');

  const simulasiLemparKoin = () => {
    // Menginisialisasi objek untuk melacak hasil ('Depan' dan 'Belakang')
    const keluar = { 'Depan': 0, 'Belakang': 0 };
    // Mensimulasikan lemparan koin sebanyak 10 kali
    for (let i = 0; i < 10; i++) {
      // Menentukan secara acak antara 'Depan' dan 'Belakang'
      // dilemparkan secara acak dengan bandingan 50/50 atau 0.5 depan dengan belakang 
      const lempar = Math.random() < 0.5 ? 'Depan' : 'Belakang';
      // Menambahkan jumlah untuk hasil yang sesuai
      keluar[lempar]++;
    }
    // Menyimpan hasil dalam state sebagai array pasangan [hasil, jumlah]
    setHasil(Object.entries(keluar));
    // Menentukan hasil yang paling sering muncul dan memperbarui state
    setPalingBanyak(keluar['Depan'] > keluar['Belakang'] ? 'Depan' : 'Belakang');
  };

  // Hook useEffect untuk mensimulasikan lemparan koin saat komponen pertama kali dimuat
  useEffect(() => {
    
    // Menjalankan simulasi
    simulasiLemparKoin();
  }, []); // Array dependensi kosong to run 1 time effect

  return (
    <main className={`min-h-screen max-w-xl mx-auto py-10 mt-[200px] ${inter.className}`} >
      {/* Kontainer untuk pesan utama dengan beberapa styling */}
      <div className="z-10  w-full font-mono text-sm ">
        Jika 2 Mata Koin dilemparkan sebanyak 10 kali, maka mata koin yang paling banyak keluar adalah: <b>{palingBanyak}</b>
      </div>

      <div className="mt-4">
        <h2 className="text-xl">Hasil Lemparan:</h2>
        <ul className='text-xl font-bold'>
          {hasil.map(([koin, hitung], index) => (
            <li key={index}>
              {koin}: {hitung}
            </li>
          ))}
        </ul>
      </div>

      <div className='mx-auto'>
      <button 
          onClick={simulasiLemparKoin} 
          className="mt-4 px-4 w-full font-semibold py-2 bg-blue-500 text-white rounded">
          Lempar
        </button>
      </div>
    </main>
  );
}
