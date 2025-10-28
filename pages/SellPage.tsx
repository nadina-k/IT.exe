import React, { useState } from 'react';
import { Page } from '../types';
import { CATEGORIES, CONDITIONS } from '../constants';
import { generateDescription } from '../services/geminiService';
import { useProducts } from '../hooks/useProducts';

interface SellPageProps {
    setPage: (page: Page) => void;
}

const inputBaseClasses = "mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 transition";

const InputField: React.FC<{ label: string; id: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; placeholder?: string }> = ({ label, id, type = 'text', value, onChange, required = true, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text">{label}</label>
        <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder} className={inputBaseClasses} />
    </div>
);

const SelectField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: readonly string[]; }> = ({ label, id, value, onChange, options }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text">{label}</label>
        <select id={id} name={id} value={value} onChange={onChange} className={inputBaseClasses}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

export const SellPage: React.FC<SellPageProps> = ({ setPage }) => {
    const { addProduct } = useProducts();
    const [formData, setFormData] = useState({
        name: '',
        category: CATEGORIES[0],
        condition: CONDITIONS[1],
        price: '',
        description: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateDescription = async () => {
        if (!formData.name || !formData.category) {
            setError('Please enter a Product Name and select a Category first.');
            return;
        }
        setError('');
        setIsGenerating(true);
        try {
            const description = await generateDescription(formData.name, formData.category);
            setFormData(prev => ({ ...prev, description }));
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!imagePreview){
            alert("Please upload an image for your product.");
            return;
        }
        const success = addProduct({ ...formData, price: Number(formData.price), imageUrl: imagePreview });
        if (success) {
            setPage('account');
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl animate-fade-in-up">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">Sell Your Gear</h1>
                <p className="text-text-muted mb-8">Fill out the details below to list your used computer part.</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-lg space-y-6">
                <InputField label="Product Name" id="name" value={formData.name} onChange={handleChange} placeholder="e.g., NVIDIA GeForce RTX 3080" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField label="Category" id="category" value={formData.category} onChange={handleChange} options={CATEGORIES} />
                    <SelectField label="Condition" id="condition" value={formData.condition} onChange={handleChange} options={CONDITIONS} />
                </div>
                <InputField label="Price (LKR)" id="price" type="number" value={formData.price} onChange={handleChange} placeholder="e.g., 150000" />
                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} className={inputBaseClasses} placeholder="Describe your item, its condition, and any accessories included."></textarea>
                    <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 text-sm font-medium text-primary hover:underline disabled:text-gray-400 disabled:cursor-wait flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        {isGenerating ? 'Generating...' : 'Generate with AI'}
                    </button>
                    {error && <p className="text-danger text-sm mt-1">{error}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text">Product Image</label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Product Preview" className="mx-auto h-40 w-auto object-contain rounded-md" />
                            ) : (
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            )}
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105">
                        List Your Item
                    </button>
                </div>
            </form>
        </div>
    );
};