import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBuilding, faTicket, faChartColumn, faCircleCheck, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { Nav, Image, Badge, Navbar, Button } from "@themesberg/react-bootstrap";
import { RoutePath } from "../../router/routes";


const Sidebar: React.FC = () => {
    const location = useLocation();
    const { pathname } = location;
    const [show, setShow] = useState(false);
    const showClass = show ? "show" : "";

    const onCollapse = () => setShow(!show);

    const NavItem = (props: any) => {
        const { title, link, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
        const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
        const navItemClassName = link === pathname ? "active" : "";

        return (
            <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
                <Nav.Link as={Link} to={link} target={target} className={classNames}>
                    <span>
                        {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon}/></span> : null}
                        {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon"/> : null}

                        <span className="sidebar-text">{title}</span>
                    </span>
                    {badgeText ? (
                        <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
                    ) :  null}
                </Nav.Link>
            </Nav.Item>
        );
    }

    return (
        <div>
            <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
                <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
                    <span className="navbar-toggler-icon" />
                </Navbar.Toggle>
            </Navbar>
            <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
                <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                    <div className="sidebar-inner px-4 pt-3">
                        <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                            <div className="d-flex align-items-center">
                                <p>Add img or sign out</p>
                            </div>
                            <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Nav.Link>
                        </div>
                        <Nav className="flex-column pt-3 pt-md-0">
                            <NavItem title="ChekdIn" icon={faCircleCheck} />
                            <NavItem title="Account Settings" icon={faUserEdit} link={RoutePath.AccountSetting.path} />
                            <NavItem title="Business Profile" icon={faBuilding} link={RoutePath.BusinessAccount.path} />
                            <NavItem title="Coupon Manager" icon={faTicket} link={RoutePath.CouponManager.path}/>
                            <NavItem title="Statistics" icon={faChartColumn} link={RoutePath.Statistics.path} badgeText="Soon" badgeBg="warning"/>
                        </Nav>
                    </div>
                </SimpleBar>
            </CSSTransition>
        </div>
    );
}

export default Sidebar;