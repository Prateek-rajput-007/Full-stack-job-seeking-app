import { postApplication } from "../../services/applicationService";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { FaSpinner } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import { FaFileUpload, FaFilePdf, FaFileWord, FaTimes } from "react-icons/fa";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [sending, setSending] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Load resume from localStorage on component mount
  useEffect(() => {
    const savedResume = localStorage.getItem(`resume_${id}`);
    if (savedResume) {
      try {
        const resumeData = JSON.parse(savedResume);
        // Convert base64 back to File object
        const byteString = atob(resumeData.data.split(',')[1]);
        const mimeString = resumeData.data.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], resumeData.name, { type: resumeData.type });
        setResume(file);
      } catch (error) {
        console.error('Error loading resume from localStorage:', error);
        localStorage.removeItem(`resume_${id}`);
      }
    }
  }, [id]);

  // Configure dropzone for resume upload
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === "file-too-large") {
        toast.error("File size must be less than 5MB");
      } else if (rejection.errors[0]?.code === "file-invalid-type") {
        toast.error("Only PDF, DOC, and DOCX files are allowed");
      } else {
        toast.error("Invalid file. Please try again.");
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setResume(file);

      // Save resume to localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const resumeData = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: reader.result
        };
        localStorage.setItem(`resume_${id}`, JSON.stringify(resumeData));
      };
      reader.readAsDataURL(file);

      toast.success("Resume uploaded successfully!");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const removeResume = () => {
    setResume(null);
    localStorage.removeItem(`resume_${id}`);
    toast.success("Resume removed");
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === 'pdf') return <FaFilePdf className="text-red-400" />;
    if (extension === 'doc' || extension === 'docx') return <FaFileWord className="text-blue-400" />;
    return <FaFileUpload className="text-violet-400" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Invalid Job ID. Please try again.");
      return;
    }

    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error("Please fill in all fields.");
      return;
    }

    const requestData = {
      name,
      email,
      phone,
      address,
      coverLetter,
      jobId: id,
    };

    console.log("Sending application:", requestData); // Debugging: Check payload before sending
    setSending(true);

    try {
      const { data } = await postApplication(requestData);

      // Save resume to localStorage with application ID if resume exists
      if (resume && data.application?._id) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const resumeData = {
            name: resume.name,
            size: resume.size,
            type: resume.type,
            data: reader.result
          };
          localStorage.setItem(`application_resume_${data.application._id}`, JSON.stringify(resumeData));
        };
        reader.readAsDataURL(resume);
      }

      // Reset form fields
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      localStorage.removeItem(`resume_${id}`);

      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      console.error("Error submitting application:", error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Application Form
            </h3>
            <p className="text-slate-400">
              Submit your application for this position
            </p>
          </div>

          <form onSubmit={handleApplication} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Resume (Optional)
              </label>

              {!resume ? (
                <div
                  {...getRootProps()}
                  className={`w-full px-4 py-8 bg-slate-800/30 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${isDragActive
                    ? 'border-violet-500 bg-violet-500/10'
                    : 'border-slate-700 hover:border-violet-500/50 hover:bg-slate-800/50'
                    }`}
                >
                  <input {...getInputProps()} />
                  <FaFileUpload className="text-4xl text-violet-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium mb-1">
                    {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
                  </p>
                  <p className="text-slate-500 text-sm">
                    or click to browse • PDF, DOC, DOCX • Max 5MB
                  </p>
                </div>
              ) : (
                <div className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {getFileIcon(resume.name)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{resume.name}</p>
                      <p className="text-slate-400 text-xs">{formatFileSize(resume.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    aria-label="Remove resume"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <textarea
                placeholder="Cover Letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-base font-bold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {sending ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  Sending Application...
                </>
              ) : (
                "Send Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;
