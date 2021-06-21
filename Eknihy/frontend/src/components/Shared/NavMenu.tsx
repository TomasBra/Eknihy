﻿import React, { Component, useState, useEffect, useContext } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { GlobalContext } from '../../App';
import { useMobile } from '../Hooks/useMobile';

export function NavMenu(props: any) {

    const [collapsed, setcollapsed] = useState(false);
    const [Expanded, SetExpanded] = useState(false);
    const [Mobile, setMobile] = useMobile(false);

    const { SearchVisible, SetSearchVisible } = useContext(GlobalContext);
    const { CartVisible, SetCartVisible } = useContext(GlobalContext);
    const { User, SetUser} = useContext(GlobalContext);

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white nav border-bottom box-shadow" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/" className="Title">MyReader</NavbarBrand>
                        {Mobile ?
                        <div>
                                <div className="float-sm-right p-0 m-0 d-inline-block">
                                    <button className="btn" onClick={() => { SetSearchVisible(!SearchVisible); SetCartVisible(false); setcollapsed(false); SetExpanded(false);  }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icon-19" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                    <button className="btn" onClick={() => { SetCartVisible(!CartVisible); SetSearchVisible(false); setcollapsed(false); SetExpanded(false);  }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart v icon-19" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                    </button>
                                    <div className="btn-group">
                                        <button className="btn" data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded={Expanded} onClick={() => { SetExpanded(!Expanded); SetCartVisible(false); SetSearchVisible(false); setcollapsed(false); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle icon-19" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                            </svg>
                                        </button>
                                        {User != null ?
                                            <div className={`dropdown-menu dropdown-menu-right p-0 m-0 ${Expanded ? "dropdown-animated" : null}`} >
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} onClik={() => { SetExpanded(false); }} className="text-dark" to="/books/All/10">
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                                            </svg>
                                                            <span className="icon-text">Mé knihy</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} className="text-dark" to="/orders/10" onClik={() => { SetExpanded(false); }}>
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-check icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                                            </svg>
                                                            <span className="icon-text">Objednávky</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} onClik={() => { SetExpanded(false); }} className="text-dark" to="/settings">
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                                            </svg>
                                                            <span className="icon-text">Nastavení</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} onClick={() => { SetUser(); localStorage.removeItem("User"); SetExpanded(false); }} className="text-dark btn" to="/">
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                            </svg>
                                                            <span className="icon-text">Odhlásit se</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </div>
                                            : <div className={`dropdown-menu dropdown-menu-right p-0 m-0 ${Expanded ? "dropdown-animated" : null}`} >
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} onClik={() => { SetExpanded(false); }} className="text-dark" to="/login">
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                            </svg>
                                                            <span className="icon-text">Přihlásit se</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} onClik={() => { SetExpanded(false); }} className="text-dark" to="/register">
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                                            </svg>
                                                            <span className="icon-text">Registrovat se</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </div>}
                                    </div>
                                </div>
                                <NavbarToggler onClick={() => { setcollapsed(!collapsed); SetCartVisible(false); SetSearchVisible(false); SetExpanded(false); }} className="mr-2 float-right d-inline-block" />
                        </div> : null}
                        <Collapse className="d-sm-inline-flex" isOpen={collapsed} navbar>
                            <ul className="navbar-nav flex-grow ml-sm-5">
                                <NavItem onClick={() => { SetCartVisible(false); SetSearchVisible(false); SetExpanded(false);}} className="ml-sm-2">
                                    <NavLink tag={Link} className="text-dark" to="/store/All/10">Obchod</NavLink>
                                </NavItem>
                                <NavItem onClick={() => { SetCartVisible(false); SetSearchVisible(false); SetExpanded(false); }} className="ml-sm-2">
                                    <NavLink tag={Link} className="text-dark" to="/application">Aplikace</NavLink>
                                </NavItem>
                                <NavItem onClick={() => { SetCartVisible(false); SetSearchVisible(false); SetExpanded(false); }} className="ml-sm-2">
                                    <NavLink tag={Link} className="text-dark" to="/contact">Kontakt</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                        {!Mobile ?
                        <div>
                            <div className="float-sm-right p-0 m-0">
                                    <button className="btn" onClick={() => { SetSearchVisible(!SearchVisible); SetCartVisible(false); setcollapsed(false); SetExpanded(false); } }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icon-19" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                                    <button className="btn" onClick={() => { SetCartVisible(!CartVisible); SetSearchVisible(false); setcollapsed(false); SetExpanded(false); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart icon-19" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    </button>
                                    <div className="btn-group">
                                        <button className="btn" data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded={Expanded} onClick={() => { SetExpanded(!Expanded); SetCartVisible(false); SetSearchVisible(false); setcollapsed(false); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle icon-19" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </button>
                                        {User != null ?
                                            <div className={`dropdown-menu dropdown-menu-right p-0 m-0 ${Expanded ? "dropdown-animated" : null}`} >
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} className="text-dark" to="/books/All/10" onClik={() => { SetExpanded(false); }}>
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                                            </svg>
                                                            <span className="icon-text">Mé knihy</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} className="text-dark" to="/orders/10" onClik={() => { SetExpanded(false); }}>
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-check icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                                            </svg>
                                                            <span className="icon-text">Objednávky</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} className="text-dark" to="/settings" onClik={() => { SetExpanded(false); }}>
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                                            </svg>
                                                            <span className="icon-text">Nastavení</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} onClick={() => { SetUser(); localStorage.removeItem("User"); SetExpanded(false); }} className="text-dark btn" to="/">
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                            </svg>
                                                            <span className="icon-text">Odhlásit se</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </div>
                                            : <div className={`dropdown-menu dropdown-menu-right p-0 m-0 ${Expanded ? "dropdown-animated" : null}`} >
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} className="text-dark" to="/login" onClik={() => { SetExpanded(false); }}>
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                            </svg>
                                                            <span className="icon-text">Přihlásit se</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="dropdown-parent">
                                                    <NavLink tag={Link} className="text-dark" to="/register" onClik={() => { SetExpanded(false); }}>
                                                        <div className="row">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus icon-19-dropdown mr-1 ml-4" viewBox="0 0 16 16">
                                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                                            </svg>
                                                            <span className="icon-text">Registrovat se</span>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </div>}
                                    </div>
                            </div>
                                <NavbarToggler onClick={() => { setcollapsed(!collapsed); SetCartVisible(false); SetSearchVisible(false); SetExpanded(false); }} className="mr-2 float-right" />
                        </div> : null}
                    </Container>
                </Navbar>
            </header>
        );
}