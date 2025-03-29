import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCity,
  FaVenusMars,
  FaBook,
  FaGamepad,
  FaFutbol,
  FaSort,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    hobbies: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHobbiesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, hobbies: [...formData.hobbies, value] });
    } else {
      setFormData({
        ...formData,
        hobbies: formData.hobbies.filter((hobby) => hobby !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) errors.lastName = "Last Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.gender.trim()) errors.gender = "Gender is required.";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (editIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = formData;
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      setStudents([...students, formData]);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      gender: "",
      hobbies: [],
    });
    setFormErrors({});
  };

  const handleDelete = (index) => {
    const filtered = students.filter((_, i) => i !== index);
    setStudents(filtered);
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Search handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter and sort students
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.phone.toLowerCase().includes(searchLower) ||
      student.city.toLowerCase().includes(searchLower) ||
      student.gender.toLowerCase().includes(searchLower) ||
      student.hobbies.some((hobby) => hobby.toLowerCase().includes(searchLower))
    );
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA =
      sortConfig.key === "name"
        ? `${a.firstName} ${a.lastName}`.toLowerCase()
        : a[sortConfig.key]?.toString().toLowerCase();
    const valB =
      sortConfig.key === "name"
        ? `${b.firstName} ${b.lastName}`.toLowerCase()
        : b[sortConfig.key]?.toString().toLowerCase();
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center p-4">
      {/* Form */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 mb-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
          Student Registration
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@domain.com"
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div className="relative">
              <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="784-755-8800"
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <FaCity className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Your City"
              className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
            />
            {formErrors.city && (
              <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
            )}
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <FaVenusMars className="text-indigo-600" />
              <label className="text-indigo-800 font-medium">Gender</label>
            </div>
            <div className="flex space-x-6">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleInputChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-indigo-700">
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {formErrors.gender && (
              <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>
            )}
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <FaBook className="text-indigo-600" />
              <label className="text-indigo-800 font-medium">Hobbies</label>
            </div>
            <div className="space-y-3">
              {[
                { value: "reading", icon: <FaBook /> },
                { value: "gaming", icon: <FaGamepad /> },
                { value: "football", icon: <FaFutbol /> },
              ].map((hobby) => (
                <label key={hobby.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={hobby.value}
                    checked={formData.hobbies.includes(hobby.value)}
                    onChange={handleHobbiesChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  {hobby.icon}
                  <span className="text-indigo-700 capitalize">{hobby.value}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium transition-colors"
          >
            {editIndex !== null ? "Update Student" : "Register Now"}
          </button>
        </form>
      </div>

      {/* Table */}
      {students.length > 0 && (
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-900 text-center mb-4">
            Registered Students
          </h2>
          {/* Search Input */}
          <div className="relative mb-6 max-w-md mx-auto">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-indigo-100 text-indigo-900">
                  {[
                    { label: "Name", key: "name" },
                    { label: "Email", key: "email" },
                    { label: "Phone", key: "phone" },
                    { label: "City", key: "city" },
                    { label: "Gender", key: "gender" },
                  ].map((col) => (
                    <th key={col.key} className="p-3 cursor-pointer" onClick={() => handleSort(col.key)}>
                      <div className="flex items-center space-x-1">
                        <span>{col.label}</span>
                        <FaSort className="text-indigo-600" />
                      </div>
                    </th>
                  ))}
                  <th className="p-3">Hobbies</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.length > 0 ? (
                  sortedStudents.map((student, index) => (
                    <tr key={index} className="border-b border-indigo-100 hover:bg-indigo-50 transition-colors">
                      <td className="p-3 text-indigo-800">{`${student.firstName} ${student.lastName}`}</td>
                      <td className="p-3 text-indigo-800">{student.email}</td>
                      <td className="p-3 text-indigo-800">{student.phone}</td>
                      <td className="p-3 text-indigo-800">{student.city}</td>
                      <td className="p-3 text-indigo-800">{student.gender}</td>
                      <td className="p-3 text-indigo-800">{student.hobbies.join(", ")}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-3 text-center text-indigo-600">
                      No students match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistration;