import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fname, setFname] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("Male");
    const [lname, setLname] = useState<string>("");
    const [repassword, setRepassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setFormError] = useState<string>("");
    const [Contype, setConType] = useState<"emailandpass" | "name">("emailandpass");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Contype === "emailandpass") {
            if (!email || !password || !repassword) {
                setFormError("All fields are required");
                return;
            }
            if (password !== repassword) {
                setFormError("Passwords do not match");
                return;
            }
        } else {
            if (!fname || !lname) {
                setFormError("First and last names are required");
                return;
            }
        }

        setFormError("");
        // Prepare the data for the API reques
        const data = {
            first_name: fname,
            last_name: lname,
            user_age: age,
            gender: gender,
            user_email: email,
            user_password: password
        };

        try {
            // Send the registration request
            const response = await axios.post('http://localhost:5000/api/users/register', data);
            console.log('Registration successful', response.data);
            navigate("/login"); // Redirect after successful registration
        } catch (err) {
            console.error('Error registering user:', err);
            setFormError('Failed to register. Please try again.');
        }
    };

    const validateEmail = (email: string) => {
        // Regular expression for basic email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };


    return (
        <div>
            <Navbar />
            <div className="flex mt-16 h-screen items-center justify-center bg-gradient-to-r from-gray-700 via-blue-200 to-gray-100 bg-opacity-50">
              
                    <div className=" mt-36 lg:mt-2 flex items-center p-2 justify-center ">
                        <div className="bg-white p-6 md:w-[390px] w-[340px] mg:bg-opacity-60">
                            <div className="flex justify-center items-center mb-10">
                                <h2 className="text-2xl font-bold">ចូលគណនី</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {Contype === "emailandpass" ? (
                                    <>
                                        <div className="mb-2 space-y-2">
                                            <label htmlFor="email" className="font-NotoSansKhmer font-bold text-lg">
                                                អុីម៉ែល : *
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control w-full p-2 border rounded"
                                                placeholder="សូមបញ្ចូលអ៊ីមែល"
                                                value={email}
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <PasswordField
                                            label="ពាក្យសម្ងាត់ : *"
                                            placeholder="សូមបញ្ចូលពាក្យសម្ងាត់"
                                            value={password}
                                            showPassword={showPassword}
                                            onChange={(e) => setPassword(e.target.value)}
                                            toggleShowPassword={() => setShowPassword(!showPassword)}
                                        />
                                        <PasswordField
                                            label="បញ្ជាក់ពាក្យសម្ងាត់ : *"
                                            placeholder="សូមបញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់"
                                            value={repassword}
                                            showPassword={showPassword}
                                            onChange={(e) => setRepassword(e.target.value)}
                                            toggleShowPassword={() => setShowPassword(!showPassword)}
                                        />
                                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                                        <div className="w-full justify-end flex items-end">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    // Check if the password and repassword match
                                                    if (password !== repassword || password === "") {
                                                        setFormError("Passwords do not match");
                                                    } else if (email === "") {
                                                        setFormError("Email is required");
                                                    } else if (!validateEmail(email)) {
                                                        setFormError("Invalid email format");
                                                    } else {
                                                        setConType("name");
                                                        setFormError("");
                                                    }
                                                }}
                                                className="text-blue-500 text-sm underline mt-4  mr-8"
                                            >
                                                បន្ត
                                            </button>
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div className="mb-2 space-y-2">
                                            <label htmlFor="fname" className="font-NotoSansKhmer font-bold text-lg">
                                                នាមខ្លួន : *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control w-full p-2 border rounded"
                                                placeholder="សូមបញ្ចូលឈ្មោះ"
                                                value={fname}
                                                required
                                                onChange={(e) => setFname(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2 space-y-2">
                                            <label htmlFor="lname" className="font-NotoSansKhmer font-bold text-lg">
                                                នាមត្រកូល : *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control w-full p-2 border rounded"
                                                placeholder="សូមបញ្ចូលនាមត្រកូល"
                                                value={lname}
                                                required
                                                onChange={(e) => setLname(e.target.value)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-2 space-y-2">
                                                <label htmlFor="age" className="font-NotoSansKhmer font-bold text-lg">
                                                    អាយុ : *
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control w-full p-2 border rounded"
                                                    placeholder="សូមបញ្ចូលអាយុ"
                                                    value={age}
                                                    required
                                                    onChange={(e) => setAge(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-2 space-y-2">
                                                <label htmlFor="gender" className="font-NotoSansKhmer font-bold text-lg">
                                                    ភេទ
                                                </label>
                                                <select
                                                    id="gender"
                                                    className="form-control w-full p-2 border rounded"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <option value="Male">ប្រុស</option>
                                                    <option value="Eemale">ស្រី</option>
                                                    <option value="Other">មិនមាន</option>
                                                </select>
                                            </div>
                                        </div>

                                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                        <div className="w-full justify-end flex items-end">
                                            <button
                                                type="button"
                                                onClick={() => setConType("emailandpass")}
                                                className="text-blue-500 text-sm underline mt-4"
                                            >
                                                ត្រឡប់មកវិញ
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded mt-4"
                                        >
                                            បង្កើតគណនី
                                        </button>
                                    </>
                                )}
                            </form>

                            <div className="pt-8"></div>

                        </div>
                    </div>
            </div>
        </div>
    );
};

// Reusable PasswordField Component
const PasswordField: React.FC<{
    label: string;
    placeholder: string;
    value: string;
    showPassword: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    toggleShowPassword: () => void;
}> = ({ label, showPassword, toggleShowPassword, ...props }) => (
    <div className="space-y-1 relative mb-4">
        <label className="font-NotoSansKhmer font-bold text-lg">{label}</label>
        <input
            type={showPassword ? "text" : "password"}
            className="form-control w-full p-2 border rounded"
            {...props}
        />
        <div
            className="absolute top-10 right-2 cursor-pointer"
            onClick={toggleShowPassword}
        >
            {showPassword ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                </svg>
            )}
        </div>
    </div>
);

export default Register;
