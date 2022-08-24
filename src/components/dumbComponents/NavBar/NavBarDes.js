import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { UilBars } from '@iconscout/react-unicons'
import { UilHeartSign } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { Link } from "react-router-dom";
export default function PrimarySearchAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className="h-10">
            <IconButton size="large" color="inherit">
                <UilHeartSign/>
            </IconButton>
        <Link to='/favorites'>
            <p className="text-md">Favoritos</p>
        </Link>
      </MenuItem>
      <MenuItem className="h-10">
                <IconButton
                size="large"
                color="inherit"
                >
                    <UilPlus/>
                </IconButton>
            <Link to='/postbook'>
                <p className="text-md">Publicar</p>
            </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <UilBars/>
          </IconButton>
          {renderMobileMenu}
    </div>
  );
}
