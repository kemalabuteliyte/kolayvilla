import { useState } from 'react';
import { motion } from 'framer-motion';
import { useVillaStore } from '../store/villaStore';
import ROOM_TYPES, { FEATURE_CATEGORIES } from '../data/roomTypes';
import { Download, Save, Eye } from 'lucide-react';

export default function Builder() {
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState(null);

  const {
    villaName,
    numberOfFloors,
    currentStep,
    currentFloor,
    rooms,
    selectedRoom,
    setVillaName,
    setNumberOfFloors,
    setCurrentStep,
    setCurrentFloor,
    addRoom,
    updateRoom,
    deleteRoom,
    setSelectedRoom,
    updateRoomFeatures,
    exportVilla
  } = useVillaStore();

  const handleAddRoom = (roomTypeId) => {
    const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === roomTypeId);
    if (roomType) {
      addRoom(currentFloor, roomType);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setSelectedRoomForEdit(room);
    setShowRoomModal(true);
  };

  const handleSaveFeatures = (features) => {
    if (selectedRoomForEdit) {
      updateRoomFeatures(currentFloor, selectedRoomForEdit.id, features);
      setShowRoomModal(false);
    }
  };

  const handleExport = () => {
    const data = exportVilla();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${villaName.replace(/\s+/g, '_')}_plan.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{villaName}</h1>
            <input
              type="text"
              value={villaName}
              onChange={(e) => setVillaName(e.target.value)}
              className="input-text"
              style={{ maxWidth: '400px' }}
              placeholder="Villa Name"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary" onClick={handleExport}>
              <Download size={20} />
              Export
            </button>
            <button className="btn btn-success">
              <Save size={20} />
              Save
            </button>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="steps-nav">
          <button
            className={`step-btn ${currentStep === 'config' ? 'active' : ''}`}
            onClick={() => setCurrentStep('config')}
          >
            1. Configuration
          </button>
          <button
            className={`step-btn ${currentStep === 'builder' ? 'active' : ''}`}
            onClick={() => setCurrentStep('builder')}
          >
            2. Floor Plan
          </button>
          <button
            className={`step-btn ${currentStep === 'details' ? 'active' : ''}`}
            onClick={() => setCurrentStep('details')}
          >
            3. Room Details
          </button>
          <button
            className={`step-btn ${currentStep === 'preview' ? 'active' : ''}`}
            onClick={() => setCurrentStep('preview')}
          >
            4. Preview
          </button>
        </div>

        {/* Configuration Step */}
        {currentStep === 'config' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="card">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Villa Configuration</h2>
              <div className="config-grid">
                <div className="config-item">
                  <label className="config-label">Number of Floors</label>
                  <select
                    value={numberOfFloors}
                    onChange={(e) => setNumberOfFloors(parseInt(e.target.value))}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem' }}
                  >
                    <option value={1}>1 Floor</option>
                    <option value={2}>2 Floors</option>
                    <option value={3}>3 Floors</option>
                    <option value={4}>4 Floors</option>
                  </select>
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: '2rem' }}
                onClick={() => setCurrentStep('builder')}
              >
                Next: Build Floor Plan
              </button>
            </div>
          </motion.div>
        )}

        {/* Builder Step */}
        {currentStep === 'builder' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Floor Selector */}
            <div className="floor-selector">
              {Array.from({ length: numberOfFloors }, (_, i) => i + 1).map(floor => (
                <button
                  key={floor}
                  className={`floor-btn ${currentFloor === floor ? 'active' : ''}`}
                  onClick={() => setCurrentFloor(floor)}
                >
                  Floor {floor}
                </button>
              ))}
            </div>

            {/* Room Palette */}
            <div className="room-palette">
              <h3 style={{ marginBottom: '1rem' }}>Room Types</h3>
              <div className="room-categories">
                {Object.values(ROOM_TYPES).map(roomType => (
                  <div
                    key={roomType.id}
                    className="room-item"
                    onClick={() => handleAddRoom(roomType.id)}
                  >
                    <span className="room-icon">{roomType.icon}</span>
                    <span className="room-name">{roomType.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="canvas-container">
              <div className="canvas">
                {rooms[currentFloor]?.map(room => {
                  const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
                  return (
                    <div
                      key={room.id}
                      className={`room-element ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                      style={{
                        left: `${room.position.x * 4}px`,
                        top: `${room.position.y * 4}px`,
                        width: `${room.size.width * 4}px`,
                        height: `${room.size.height * 4}px`,
                        borderColor: roomType?.color,
                        backgroundColor: `${roomType?.color}33`
                      }}
                      onClick={() => handleRoomClick(room)}
                    >
                      <span className="room-element-icon">{roomType?.icon}</span>
                      <span className="room-element-name">{room.customName || room.name}</span>
                      <div className="room-controls">
                        <button
                          className="room-control-btn danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteRoom(currentFloor, room.id);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {rooms[currentFloor]?.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  Click on room types above to add them to this floor
                </div>
              )}
            </div>

            <div className="flex gap-2" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => setCurrentStep('config')}>
                Back
              </button>
              <button className="btn btn-primary" onClick={() => setCurrentStep('details')}>
                Next: Add Details
              </button>
            </div>
          </motion.div>
        )}

        {/* Details Step */}
        {currentStep === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="card">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Room Details</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Click on any room in the floor plan to customize its features
              </p>
              <div className="floor-selector">
                {Array.from({ length: numberOfFloors }, (_, i) => i + 1).map(floor => (
                  <button
                    key={floor}
                    className={`floor-btn ${currentFloor === floor ? 'active' : ''}`}
                    onClick={() => setCurrentFloor(floor)}
                  >
                    Floor {floor} ({rooms[floor]?.length || 0} rooms)
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '2rem' }}>
                {rooms[currentFloor]?.map(room => {
                  const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
                  return (
                    <div
                      key={room.id}
                      className="card card-hover"
                      style={{ marginBottom: '1rem', borderColor: roomType?.color }}
                      onClick={() => handleRoomClick(room)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '2rem' }}>{roomType?.icon}</span>
                          <div>
                            <h3>{room.customName || room.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                              {room.size.width}m × {room.size.height}m
                            </p>
                          </div>
                        </div>
                        <button className="btn btn-secondary btn-sm">
                          Customize →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => setCurrentStep('builder')}>
                Back
              </button>
              <button className="btn btn-primary" onClick={() => setCurrentStep('preview')}>
                Next: Preview
              </button>
            </div>
          </motion.div>
        )}

        {/* Preview Step */}
        {currentStep === 'preview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="preview-container">
              <h2 className="preview-section-title">Villa Overview</h2>
              <div className="preview-grid">
                <div className="preview-stat">
                  <div className="preview-stat-value">{numberOfFloors}</div>
                  <div className="preview-stat-label">Floors</div>
                </div>
                <div className="preview-stat">
                  <div className="preview-stat-value">
                    {Object.values(rooms).reduce((acc, floor) => acc + floor.length, 0)}
                  </div>
                  <div className="preview-stat-label">Total Rooms</div>
                </div>
                {Array.from({ length: numberOfFloors }, (_, i) => i + 1).map(floor => (
                  <div key={floor} className="preview-stat">
                    <div className="preview-stat-value">{rooms[floor]?.length || 0}</div>
                    <div className="preview-stat-label">Floor {floor} Rooms</div>
                  </div>
                ))}
              </div>

              <div className="preview-section" style={{ marginTop: '2rem' }}>
                <h3 className="preview-section-title">All Rooms</h3>
                {Array.from({ length: numberOfFloors }, (_, i) => i + 1).map(floor => (
                  <div key={floor} style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Floor {floor}</h4>
                    <div className="grid grid-3">
                      {rooms[floor]?.map(room => {
                        const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
                        return (
                          <div key={room.id} className="card">
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                              {roomType?.icon}
                            </div>
                            <h4>{room.customName || room.name}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                              {room.size.width}m × {room.size.height}m ({room.size.width * room.size.height}m²)
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => setCurrentStep('details')}>
                Back
              </button>
              <button className="btn btn-success" onClick={handleExport}>
                <Download size={20} />
                Export Plan
              </button>
            </div>
          </motion.div>
        )}

        {/* Room Feature Modal */}
        {showRoomModal && selectedRoomForEdit && (
          <RoomFeatureModal
            room={selectedRoomForEdit}
            onClose={() => setShowRoomModal(false)}
            onSave={handleSaveFeatures}
          />
        )}
      </div>
    </div>
  );
}

// Room Feature Modal Component
function RoomFeatureModal({ room, onClose, onSave }) {
  const [features, setFeatures] = useState(room.features || {});
  const [roomName, setRoomName] = useState(room.customName || '');

  const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
  const availableFeatures = roomType?.features || [];

  const handleFeatureChange = (category, option, value) => {
    setFeatures(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: value
      }
    }));
  };

  const handleSave = () => {
    onSave({ ...features, customName: roomName });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {roomType?.icon} Customize {room.name}
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label>Custom Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder={room.name}
            />
          </div>

          <div className="feature-editor">
            {availableFeatures.map(featureCat => {
              const category = FEATURE_CATEGORIES[featureCat];
              if (!category) return null;

              return (
                <div key={featureCat} className="feature-category">
                  <div className="feature-category-header">
                    <span className="feature-category-icon">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  <div className="feature-options">
                    {Object.entries(category.options).map(([optionKey, option]) => (
                      <div key={optionKey} className="feature-option">
                        <label className="feature-option-label">
                          <span className="feature-option-icon">{option.icon}</span>
                          {option.name}
                        </label>
                        {option.type === 'number' && (
                          <input
                            type="number"
                            min={option.min}
                            max={option.max}
                            value={features[featureCat]?.[optionKey] ?? option.default}
                            onChange={(e) => handleFeatureChange(featureCat, optionKey, parseInt(e.target.value))}
                          />
                        )}
                        {option.type === 'boolean' && (
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={features[featureCat]?.[optionKey] ?? option.default}
                              onChange={(e) => handleFeatureChange(featureCat, optionKey, e.target.checked)}
                            />
                            <span>{features[featureCat]?.[optionKey] ? 'Yes' : 'No'}</span>
                          </label>
                        )}
                        {option.type === 'select' && (
                          <select
                            value={features[featureCat]?.[optionKey] ?? option.default}
                            onChange={(e) => handleFeatureChange(featureCat, optionKey, e.target.value)}
                          >
                            {option.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </motion.div>
    </div>
  );
}
