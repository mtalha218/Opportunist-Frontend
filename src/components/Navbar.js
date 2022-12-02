import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { switchRole } from "api/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FormControl, InputLabel, Select } from "@mui/material";

import { Admin, Buyer, Employer, JobSeeker, Seller } from "services/routes";
import { putRequest } from "services/apiClient";
import Searchbar from "./Searchbar";

const NavbarSection = ({ authenticated, logout }) => {
  const navigate = useNavigate();

  const [userImage, setUserImage] = useState("");
  const [userRole, setUserRole] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserImage(user.profileImg);
    setUserRole(user.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [authenticated]);

  const signout = () => {
    logout();
    navigate("/auth/login");
  };
  const toProfile = () => {
    navigate("/user/profile");
  };
  const login = () => {
    navigate("/auth/login");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (id, event) => {
    setAnchorElNav(null);
    // setAnchorElNav(event.currentTarget);
    navigate(id);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    // setAnchorElUser(event.currentTarget);
  };
  const handleRole = async (event) => {
    setUserRole(event.target.value);
    const sendData = {
      role: event.target.value,
    };
    const withJWT = true;
    try {
      const {
        data: {
          data: { role },
        },
      } = await putRequest(switchRole(), sendData, withJWT);
      localStorage.setItem("role", role);
      logout();
      navigate("/auth/login");
    } catch (e) {
      console.log("failed to switch role: ", e);
    }
  };

  const handleSearch = ({ target: { value } }) => {
    console.log("input value: ", value);
    setData(value);
  };

  const toGigs = (event) => {
    if (event.keyCode === 13) {
      if (data) {
        navigate(`/user/allgig/${data}`);
        setAnchorElNav(null);
        setAnchorElUser(null);
      }
    }
  };

  const ROLES = ["Buyer", "Seller", "Job Seeker", "Employer"];

  return (
    <AppBar position="sticky" className="mb-3">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {authenticated && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {userRole === "Employer"
                  ? Employer.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : userRole === "Buyer"
                  ? Buyer.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : userRole === "Seller"
                  ? Seller.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : userRole === "Job Seeker"
                  ? JobSeeker.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : Admin.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            )}
          </Box>

          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Searchbar
              searchValue={data}
              onEnter={toGigs}
              handleSearch={handleSearch}
            />
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {authenticated && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                {userRole === "Employer"
                  ? Employer.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : userRole === "Buyer"
                  ? Buyer.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : userRole === "Seller"
                  ? Seller.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : userRole === "Job Seeker"
                  ? JobSeeker.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))
                  : Admin.map(({ path, name }) => (
                      <MenuItem
                        key={name}
                        onClick={() => handleCloseNavMenu(path)}
                      >
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            )}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 2,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            The Opportunist
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "start",
              display: { xs: "none", md: "flex" },
            }}
          >
            {authenticated && (
              <Searchbar
                searchValue={data}
                onEnter={toGigs}
                handleSearch={handleSearch}
              />
            )}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              marginRight: "2rem",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              onClick={() => handleCloseNavMenu("/user/dashboard")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => handleCloseNavMenu("/user/aboutUs")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About US
            </Button>
            <Button
              onClick={() => handleCloseNavMenu("/blogs")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Blogs
            </Button>
          </Box>

          {authenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <div className="d-flex flex-row w-100 align-items-center gap-2 rounded p-1 mx-0">
                    <div
                      id="avatar"
                      className="flex-column"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <img
                        src={
                          JSON.parse(localStorage.getItem("user")).profileImg
                        }
                        alt="Avatar"
                      ></img>
                    </div>
                    <div
                      id="content-section"
                      className="d-flex flex-column justify-content-center"
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          padding: 0,
                          margin: 0,
                          lineHeight: "1rem",
                        }}
                      >
                        {JSON.parse(localStorage.getItem("user")).firstName}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          padding: "0px",
                          margin: 0,
                          lineHeight: "1rem",
                        }}
                      >
                        {JSON.parse(localStorage.getItem("user")).email}
                      </p>
                    </div>
                  </div>
                </MenuItem>

                <Box sx={{ minWidth: 120 }} className="m-2">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userRole}
                      label="Role"
                      onChange={handleRole}
                    >
                      {ROLES.includes(userRole) ? (
                        ROLES.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
                {userRole !== "Admin" && (
                  <MenuItem onClick={toProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={signout}>
                  <Typography textAlign="center"> Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={login}>
                  <Typography textAlign="center">Signin</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarSection;
