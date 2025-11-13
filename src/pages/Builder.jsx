import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useVillaStore } from '../store/villaStore';
import ROOM_TYPES, { FEATURE_CATEGORIES } from '../data/roomTypes';
import { Download, Save, Grid, ZoomIn, ZoomOut, Upload } from 'lucide-react';
import { DraggableRoom } from '../components/DraggableRoom';

export default function Builder() {
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState(null);
  const [draggedRoomType, setDraggedRoomType] = useState(null);
  const [canvasScale, setCanvasScale] = useState(4);
  const [showGrid, setShowGrid] = useState(true);
  const [roomSearch, setRoomSearch] = useState('');
  const canvasRef = useRef(null);

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
    exportVilla,
    importVilla
  } = useVillaStore();

  // Handle drag from palette
  const handleDragStart = (e, roomTypeId) => {
    const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === roomTypeId);
    setDraggedRoomType(roomType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedRoomType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, (e.clientX - rect.left) / canvasScale);
    const y = Math.max(0, (e.clientY - rect.top) / canvasScale);

    // Snap to grid
    const snappedX = Math.round(x / 2) * 2;
    const snappedY = Math.round(y / 2) * 2;

    const roomId = addRoom(currentFloor, draggedRoomType);

    // Update position immediately
    if (roomId) {
      const newRoom = rooms[currentFloor].find(r => r.id === roomId);
      if (newRoom) {
        updateRoom(currentFloor, roomId, {
          position: { x: snappedX, y: snappedY }
        });
      }
    }

    setDraggedRoomType(null);
  };

  const handleRoomUpdate = (updatedRoom) => {
    updateRoom(currentFloor, updatedRoom.id, updatedRoom);
  };

  // Check if two rooms overlap
  const checkOverlap = (room1, room2) => {
    const r1 = {
      left: room1.position.x,
      right: room1.position.x + room1.size.width,
      top: room1.position.y,
      bottom: room1.position.y + room1.size.height
    };
    const r2 = {
      left: room2.position.x,
      right: room2.position.x + room2.size.width,
      top: room2.position.y,
      bottom: room2.position.y + room2.size.height
    };

    return !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
  };

  // Get overlapping rooms for a specific room
  const getOverlappingRooms = (room) => {
    if (!room) return [];
    return rooms[currentFloor]?.filter(r => r.id !== room.id && checkOverlap(room, r)) || [];
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setSelectedRoomForEdit(room);
    setShowRoomModal(true);
  };

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      setSelectedRoom(null);
    }
  };

  const handleRoomDuplicate = (room) => {
    const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
    if (!roomType) return;

    const newRoomId = addRoom(currentFloor, roomType);
    if (newRoomId) {
      // Position the duplicate offset from the original
      updateRoom(currentFloor, newRoomId, {
        position: { x: room.position.x + 4, y: room.position.y + 4 },
        size: room.size,
        features: { ...room.features },
        customName: room.customName ? `${room.customName} (Copy)` : ''
      });
    }
  };

  const handleSaveFeatures = (features, customName) => {
    if (selectedRoomForEdit) {
      updateRoomFeatures(currentFloor, selectedRoomForEdit.id, features);
      if (customName !== selectedRoomForEdit.customName) {
        updateRoom(currentFloor, selectedRoomForEdit.id, { customName });
      }
      setShowRoomModal(false);
      setSelectedRoom(null);
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

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        importVilla(data);
        alert('Villa plan imported successfully!');
      } catch (error) {
        alert('Error importing villa plan. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };

  const zoomIn = () => setCanvasScale(Math.min(6, canvasScale + 0.5));
  const zoomOut = () => setCanvasScale(Math.max(2, canvasScale - 0.5));

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
              style={{ maxWidth: '400px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              placeholder="Villa Name"
            />
          </div>
          <div className="flex gap-2">
            <label className="btn btn-secondary" style={{ margin: 0 }}>
              <Upload size={20} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
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
                Next: Build Floor Plan →
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
                  onClick={() => {
                    setCurrentFloor(floor);
                    setSelectedRoom(null);
                  }}
                >
                  Floor {floor} ({rooms[floor]?.length || 0} rooms)
                </button>
              ))}
            </div>

            <div className="builder-layout">
              {/* Room Palette */}
              <div className="room-palette">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Room Types</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
                    (Drag to canvas)
                  </span>
                </h3>
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={roomSearch}
                  onChange={(e) => setRoomSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)'
                  }}
                />
                <div className="room-categories">
                  {Object.values(ROOM_TYPES)
                    .filter(roomType =>
                      roomType.name.toLowerCase().includes(roomSearch.toLowerCase()) ||
                      roomType.id.toLowerCase().includes(roomSearch.toLowerCase())
                    )
                    .map(roomType => (
                      <div
                        key={roomType.id}
                        className="room-item"
                        draggable
                        onDragStart={(e) => handleDragStart(e, roomType.id)}
                        style={{ borderColor: roomType.color }}
                      >
                        <span className="room-icon">{roomType.icon}</span>
                        <span className="room-name">{roomType.name}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                          {roomType.defaultSize.width}×{roomType.defaultSize.height}m
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Canvas Controls */}
              <div className="canvas-controls">
                <button
                  className={`btn btn-sm ${showGrid ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Grid size={16} />
                  Grid
                </button>
                <button className="btn btn-secondary btn-sm" onClick={zoomOut}>
                  <ZoomOut size={16} />
                </button>
                <span style={{ padding: '0 0.5rem', color: 'var(--text-secondary)' }}>
                  {Math.round((canvasScale / 4) * 100)}%
                </span>
                <button className="btn btn-secondary btn-sm" onClick={zoomIn}>
                  <ZoomIn size={16} />
                </button>
              </div>

              {/* Canvas */}
              <div className="canvas-container">
                <div
                  ref={canvasRef}
                  className={`canvas ${showGrid ? 'show-grid' : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleCanvasClick}
                  style={{
                    backgroundSize: showGrid ? `${canvasScale * 2}px ${canvasScale * 2}px` : 'auto'
                  }}
                >
                  {rooms[currentFloor]?.map(room => {
                    const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
                    const overlappingRooms = getOverlappingRooms(room);
                    const hasOverlap = overlappingRooms.length > 0;

                    return (
                      <DraggableRoom
                        key={room.id}
                        room={room}
                        roomType={roomType}
                        isSelected={selectedRoom?.id === room.id}
                        hasOverlap={hasOverlap}
                        onClick={handleRoomClick}
                        onUpdate={handleRoomUpdate}
                        onDelete={(id) => deleteRoom(currentFloor, id)}
                        onDuplicate={handleRoomDuplicate}
                        scale={canvasScale}
                      />
                    );
                  })}

                  {draggedRoomType && (
                    <div className="canvas-hint">
                      Drop here to add {draggedRoomType.name}
                    </div>
                  )}

                  {rooms[currentFloor]?.length === 0 && !draggedRoomType && (
                    <div className="canvas-empty">
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
                      <h3>Drag rooms from the palette to start building</h3>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Click and drag to reposition • Drag corners to resize
                      </p>
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="canvas-legend">
                  <div className="legend-item">
                    <span>🖱️ Drag to move</span>
                  </div>
                  <div className="legend-item">
                    <span>📏 Drag corners to resize</span>
                  </div>
                  <div className="legend-item">
                    <span>⚙️ Click room for details</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => setCurrentStep('config')}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => setCurrentStep('details')}>
                Next: Add Details →
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
                Click on any room to customize its features, outlets, fixtures, and more
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
                {rooms[currentFloor]?.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <p>No rooms on this floor. Go back to add rooms.</p>
                  </div>
                ) : (
                  rooms[currentFloor]?.map(room => {
                    const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
                    const featureCount = Object.keys(room.features || {}).length;

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
                                {room.size.width}m × {room.size.height}m ({room.size.width * room.size.height}m²)
                              </p>
                              {featureCount > 0 && (
                                <p style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                  ✓ {featureCount} feature{featureCount !== 1 ? 's' : ''} configured
                                </p>
                              )}
                            </div>
                          </div>
                          <button className="btn btn-primary btn-sm">
                            {featureCount > 0 ? 'Edit' : 'Customize'} →
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="flex gap-2" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => setCurrentStep('builder')}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => setCurrentStep('preview')}>
                Next: Preview →
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
                <div className="preview-stat">
                  <div className="preview-stat-value">
                    {Object.values(rooms).reduce((acc, floor) =>
                      acc + floor.reduce((sum, room) => sum + (room.size.width * room.size.height), 0), 0
                    )}m²
                  </div>
                  <div className="preview-stat-label">Total Area</div>
                </div>
                {Array.from({ length: numberOfFloors }, (_, i) => i + 1).map(floor => (
                  <div key={floor} className="preview-stat">
                    <div className="preview-stat-value">{rooms[floor]?.length || 0}</div>
                    <div className="preview-stat-label">Floor {floor} Rooms</div>
                  </div>
                ))}
              </div>

              <div className="preview-section" style={{ marginTop: '2rem' }}>
                <h3 className="preview-section-title">Floor Plans</h3>
                {Array.from({ length: numberOfFloors }, (_, i) => i + 1).map(floor => (
                  <div key={floor} style={{ marginBottom: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
                      Floor {floor} ({rooms[floor]?.length || 0} rooms, {rooms[floor]?.reduce((sum, room) => sum + (room.size.width * room.size.height), 0) || 0}m²)
                    </h4>
                    {rooms[floor]?.length === 0 ? (
                      <p style={{ color: 'var(--text-secondary)' }}>No rooms on this floor</p>
                    ) : (
                      <div className="grid grid-3">
                        {rooms[floor]?.map(room => {
                          const roomType = Object.values(ROOM_TYPES).find(rt => rt.id === room.type);
                          const area = room.size.width * room.size.height;
                          return (
                            <div key={room.id} className="card">
                              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                {roomType?.icon}
                              </div>
                              <h4>{room.customName || room.name}</h4>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                {room.size.width}m × {room.size.height}m ({area}m²)
                              </p>
                              {Object.keys(room.features || {}).length > 0 && (
                                <p style={{ color: 'var(--success)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                  ✓ Features configured
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => setCurrentStep('details')}>
                ← Back
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
            onClose={() => {
              setShowRoomModal(false);
              setSelectedRoom(null);
            }}
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
  const [expandedCategories, setExpandedCategories] = useState({});

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

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const expandAll = () => {
    const expanded = {};
    availableFeatures.forEach(cat => {
      expanded[cat] = true;
    });
    setExpandedCategories(expanded);
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  const handleSave = () => {
    onSave(features, roomName);
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Features & Customization</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-sm btn-secondary" onClick={expandAll}>
                Expand All
              </button>
              <button className="btn btn-sm btn-secondary" onClick={collapseAll}>
                Collapse All
              </button>
            </div>
          </div>

          <div className="feature-editor">
            {availableFeatures.map(featureCat => {
              const category = FEATURE_CATEGORIES[featureCat];
              if (!category) return null;

              const isExpanded = expandedCategories[featureCat];
              const configuredCount = Object.keys(features[featureCat] || {}).length;

              return (
                <div key={featureCat} className="feature-category">
                  <div
                    className="feature-category-header clickable"
                    onClick={() => toggleCategory(featureCat)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                      <span className="feature-category-icon">{category.icon}</span>
                      <span>{category.name}</span>
                      {configuredCount > 0 && (
                        <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                          {configuredCount} configured
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '1.25rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </div>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="feature-options"
                    >
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
                    </motion.div>
                  )}
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
