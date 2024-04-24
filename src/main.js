import { createApp } from 'vue'

// นำเข้าไฟล์ CSS สำหรับใช้ในแอปพลิเคชัน
import './style.css'

// นำเข้าคอมโพเนนต์หลักของแอปพลิเคชัน
import App from './App.vue'

// สร้างแอปพลิเคชัน Vue และนำ App component มาเชื่อมต่อและ render ใน element ที่มี id เป็น 'app'
createApp(App).mount('#app')
