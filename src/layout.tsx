import { AppBar, Toolbar } from "@mui/material";
import App from "next/app";
import Head from "next/head";
import Script from "next/script";
import React from "react";

interface LayoutProps {
    children: React.ReactElement[]
}

export const Layout = (props:LayoutProps) => (
    <>


    <AppBar position="static" >
        <Toolbar>
            Toolbar
        </Toolbar>
    </AppBar>
    <div styles={{display: 'block'}}>
    
    </div>
    {props.children}
    </>
);