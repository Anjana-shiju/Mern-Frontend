import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="col-md-2 bg-white vh-100 shadow-sm position-fixed d-flex flex-column p-4">
            <div className="mb-5 text-center">
                <h3 className="fw-bold m-0">Wander<span style={{ color: '#ff9800' }}>way</span></h3>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Admin Panel</small>
            </div>
            <ul className="nav flex-column gap-2 flex-grow-1">
                <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link rounded-3 p-3 shadow-sm text-white" style={{ backgroundColor: '#ff9800' }}>
                        <i className="bi bi-grid-1x2-fill me-2"></i> Dashboard
                    </Link>
                </li>
                {['Packages', 'Bookings', 'Activities', 'Gallery'].map((item) => (
                    <li className="nav-item border-bottom pb-1" key={item}>
                        <Link to={`/admin/${item.toLowerCase()}`} className="nav-link text-dark p-2 small fw-semibold">
                            <i className="bi bi-chevron-right me-2 text-muted" style={{ fontSize: '10px' }}></i> {item}
                        </Link>
                    </li>
                ))}
            </ul>
           
        </div>
    );
};

export default Sidebar;