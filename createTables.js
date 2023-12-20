const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Passwordkau123',
  server: 'localhost',
  database: 'nodejs',
  options: {
    trustedconnection: true,
    enableArithAbort: true,
  },
};

const createTables = async () => {
  try {
    await sql.connect(config);

    // Membuat tabel mahasiswa
    await sql.query(`
      CREATE TABLE mahasiswa (
        nim INT PRIMARY KEY,
        Nama_mahasiswa NVARCHAR(255),
        Jurusan NVARCHAR(100)
      )
    `);

    // Membuat tabel mata_kuliah
    await sql.query(`
      CREATE TABLE mata_kuliah (
        kode_mata_kuliah INT PRIMARY KEY,
        nama_mata_kuliah NVARCHAR(255),
        sks INT
      )
    `);

    // Membuat tabel nilai_mahasiswa
    await sql.query(`
      CREATE TABLE nilai_mahasiswa (
        nim INT,
        Kode_matakuliah INT,
        uts FLOAT,
        tugas FLOAT,
        uas FLOAT,
        FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
        FOREIGN KEY (Kode_matakuliah) REFERENCES mata_kuliah(kode_mata_kuliah)
      )
    `);

    console.log('Tabel berhasil dibuat');

    // Memasukkan data ke tabel mahasiswa
    await sql.query(`
      INSERT INTO mahasiswa (nim, Nama_mahasiswa, Jurusan)
      VALUES 
        (1, 'Nama1', 'Jurusan1'),
        (2, 'Nama2', 'Jurusan2'),
        (3, 'Nama3', 'Jurusan3'),
        (4, 'Nama4', 'Jurusan4'),
        (5, 'Nama5', 'Jurusan5')
    `);

    // Memasukkan data ke tabel mata_kuliah
    await sql.query(`
      INSERT INTO mata_kuliah (kode_mata_kuliah, nama_mata_kuliah, sks)
      VALUES 
        (101, 'Matkul1', 3),
        (102, 'Matkul2', 4),
        (103, 'Matkul3', 2)
        -- tambahkan data lainnya
    `);

    // Memasukkan data ke tabel nilai_mahasiswa
    await sql.query(`
      INSERT INTO nilai_mahasiswa (nim, Kode_matakuliah, uts, tugas, uas)
      VALUES 
        (1, 101, 80, 85, 75),
        (2, 102, 70, 65, 80),
        (3, 103, 85, 90, 78)
        -- tambahkan data lainnya
    `);

    console.log('Data berhasil dimasukkan ke dalam tabel');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  } finally {
    sql.close();
  }
};

createTables();
