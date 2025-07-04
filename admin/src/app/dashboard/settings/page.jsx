"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../../lib/api";
import { FiSave, FiKey, FiEye, FiEyeOff } from "react-icons/fi";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        setApiKey(res.weatherApiKey || "");
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings({ weatherApiKey: apiKey });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Bot Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weather API Key
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiKey className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your OpenWeather API key"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This key will be used to fetch weather data for your Telegram bot.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={saving || loading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
                saving || loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors`}
            >
              <FiSave className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Settings"}</span>
            </button>

            {success && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm">
                Settings saved successfully!
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">API Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800">
              OpenWeather API
            </h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">Active</p>
            <p className="text-xs text-blue-500 mt-1">Current provider</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800">
              Requests Today
            </h3>
            <p className="text-2xl font-bold text-green-600 mt-2">1,243</p>
            <p className="text-xs text-green-500 mt-1">+12% from yesterday</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800">
              Monthly Limit
            </h3>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              5,000/10,000
            </p>
            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
