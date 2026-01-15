import React, { useState } from 'react';

interface ButtonProps {
    label: string;
    backgroundColor?: string;
    textColor?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    backgroundColor = '#007bff',
    textColor = '#ffffff',
    onClick,
    disabled = false,
}) => {
    const [bgColor, setBgColor] = useState(backgroundColor);
    const [txtColor, setTxtColor] = useState(textColor);

    const changeButtonStyle = (newBgColor: string, newTxtColor: string) => {
        setBgColor(newBgColor);
        setTxtColor(newTxtColor);
    };

    return (
        <div>
            <button
                onClick={onClick}
                disabled={disabled}
                style={{
                    backgroundColor: bgColor,
                    color: txtColor,
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                }}
            >
                {label}
            </button>
        </div>
    );
};

// Predefined button variants
export const EditButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <div className="hover:opacity-80 transition-opacity duration-200 inline-block">
        <Button label="Edit" backgroundColor="#007bff" textColor="#ffffff" onClick={onClick} />
    </div>
);

export const DeleteButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <div className="hover:opacity-80 transition-opacity duration-200 inline-block">
    <Button label="Delete" backgroundColor="#dc3545" textColor="#ffffff" onClick={onClick} />
    </div>
);

export const SaveButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <div className="hover:opacity-80 transition-opacity duration-200 inline-block">
        <Button label="Save" backgroundColor="#28a745" textColor="#ffffff" onClick={onClick} />
    </div>
);

export default Button;