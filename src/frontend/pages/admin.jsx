import React from 'react';
import Context from '../context';
import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import AdminDashboard from '../components/adminDashboard/adminDashboard';

export default function Admin() {
  return (
    <AdminDashboard></AdminDashboard>
  )
}
