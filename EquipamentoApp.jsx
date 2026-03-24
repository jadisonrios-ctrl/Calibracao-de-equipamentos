import React, { useState, useEffect } from 'react';

function EquipamentoApp() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [filter, setFilter] = useState('');
    const [editingEquipamento, setEditingEquipamento] = useState(null);

    useEffect(() => {
        // Load data from local storage or API
        const loadedEquipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
        setEquipamentos(loadedEquipamentos);
    }, []);

    useEffect(() => {
        // Save data to local storage
        localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    }, [equipamentos]);

    const addEquipamento = (newEquipamento) => {
        setEquipamentos([...equipamentos, newEquipamento]);
    };

    const editEquipamento = (id) => {
        const equipamentoToEdit = equipamentos.find(eq => eq.id === id);
        setEditingEquipamento(equipamentoToEdit);
    };

    const updateEquipamento = (updatedEquipamento) => {
        setEquipamentos(equipamentos.map(eq => (eq.id === updatedEquipamento.id ? updatedEquipamento : eq)));
        setEditingEquipamento(null);
    };

    const deleteEquipamento = (id) => {
        setEquipamentos(equipamentos.filter(eq => eq.id !== id));
    };

    const recalibrateEquipamento = (id) => {
        setEquipamentos(equipamentos.map(eq => {
            if (eq.id === id) {
                return {...eq, lastCalibrated: new Date()};
            }
            return eq;
        }));
    };

    const filteredEquipamentos = equipamentos.filter(eq => eq.name.toLowerCase().includes(filter.toLowerCase()));

    const exportToExcel = () => {
        // Logic to export data to Excel
    };

    const exportToPDF = () => {
        // Logic to export data to PDF
    };

    return (
        <div>
            <h1>Equipamento Calibration App</h1>
            <input 
                type="text" 
                placeholder="Filter" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
            />
            <ul>
                {filteredEquipamentos.map(eq => (
                    <li key={eq.id}>
                        {eq.name} - Last calibrated: {eq.lastCalibrated}
                        <button onClick={() => editEquipamento(eq.id)}>Edit</button>
                        <button onClick={() => deleteEquipamento(eq.id)}>Delete</button>
                        <button onClick={() => recalibrateEquipamento(eq.id)}>Recalibrate</button>
                    </li>
                ))}
            </ul>
            <button onClick={exportToExcel}>Export to Excel</button>
            <button onClick={exportToPDF}>Export to PDF</button>
        </div>
    );
}

export default EquipamentoApp;
