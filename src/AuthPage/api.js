import axios from "axios"; // นำเข้าโมดูล axios เพื่อทำ HTTP requests
import Swal from 'sweetalert'; // นำเข้าโมดูล sweetalert เพื่อใช้ในการแสดง popup

// ฟังก์ชัน loginRest สำหรับการเข้าสู่ระบบ
const loginRest = async (username, secret) => {
  try {
    // ทำ HTTP GET request ไปยัง API เพื่อตรวจสอบการเข้าสู่ระบบ
    const response = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return response; // ส่งข้อมูลที่ได้รับกลับ
  } catch (error) {
    // ตรวจสอบประเภทของข้อผิดพลาดและแสดง popup แจ้งเตือน
    if (error.response && error.response.status === 401) {
      Swal('Login Error', 'Invalid username or password.', 'error');
    } else {
      Swal('Login Error', 'An unknown error occurred. Please try again.', 'error');
    }
    // โยนข้อผิดพลาดออกไป เพื่อให้ caller รับทราบหรือจัดการต่อ
    throw error;
  }
};

// ฟังก์ชัน signupRest สำหรับการสมัครสมาชิก
const signupRest = async (username, secret, email, first_name, last_name) => {
  try {
    // ทำ HTTP POST request ไปยัง API เพื่อสร้างบัญชีผู้ใช้ใหม่
    const response = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      {
        headers: {
          "Private-Key": import.meta.env.VITE_CHAT_ENGINE_PRIVATE_KEY,
        },
      }
    );
    return response; // ส่งข้อมูลที่ได้รับกลับ
  } catch (error) {
    // ตรวจสอบประเภทของข้อผิดพลาดและแสดง popup แจ้งเตือน
    if (error.response && error.response.status === 400) {
      Swal('Sign Up Error', 'Failed to sign up. Please check your inputs and try again.', 'error');
    } else {
      Swal('Sign Up Error', 'An unknown error occurred. Please try again.', 'error');
    }
    // โยนข้อผิดพลาดออกไป เพื่อให้ caller รับทราบหรือจัดการต่อ
    throw error;
  }
};

// ส่งออกฟังก์ชัน loginRest และ signupRest เพื่อให้สามารถเรียกใช้จากภายนอกได้
export { loginRest, signupRest };
