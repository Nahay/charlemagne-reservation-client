import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import Logout from '../../generic/Logout';


const AdminHeaderBody = ({ toggle }) => {

    const history = useHistory();

    const handleAdminLogout = () => {
        localStorage.removeItem('adminToken');
        history.push('/admin');
        toast.success('Vous avez été déconnecté.');
    }

    return (
        <div className = "header__body">

            <Logout
                handleLogout={handleAdminLogout}
                isAdmin={true}
                token={localStorage.getItem("adminToken")}
            />

            <nav>
                <NavLink
                    exact to="/admin/accueil"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Accueil
                </NavLink>
                <NavLink
                    to="/admin/plats"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Plats
                </NavLink>
                <NavLink
                    to="/admin/dates"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Dates
                </NavLink>
                <NavLink
                    to="/admin/reservations"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Réservations
                </NavLink>
                <NavLink
                    exact to="/admin/comptes"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Comptes
                </NavLink>
            </nav>
        </div>
    );
}
 
export default AdminHeaderBody;