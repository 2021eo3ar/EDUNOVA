import React, { useState, useRef, useEffect } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { fakePeopleData } from "../data/PersonData";
import { useSearchParams } from "react-router-dom";
import AddMemberForm from "./AddMemberForm";
import EditProfile from "./EditProfile";
import DeleteMember from "./DeleteMember";
import ShowProfile from "./ShowProfile";
import Filter from "./Filter";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";

const columnHelper = createColumnHelper();

const TeamTable = () => {
  const [data, setData] = useState(fakePeopleData);
  const [filteredData, setFilteredData] = useState(fakePeopleData);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [personToDelete, setPersonToDelete] = useState(null);
  const [isAddMemberFormVisible, setIsAddMemberFormVisible] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);
  const [isShowProfileVisible, setIsShowProfileVisible] = useState(false);
  const [personToShow, setPersonToShow] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    roles: [],
    teams: [],
  });
  const filterButtonRef = useRef(null);

  useEffect(() => {
    let filtered = data;

    if (query) {
      filtered = filtered.filter((person) =>
        `${person.firstName} ${person.lastName}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    if (filterCriteria.roles.length > 0) {
      filtered = filtered.filter((person) =>
        filterCriteria.roles.includes(person.role)
      );
    }

    if (filterCriteria.teams.length > 0) {
      filtered = filtered.filter((person) =>
        filterCriteria.teams.some((team) => person.team.includes(team))
      );
    }

    setFilteredData(filtered);
  }, [query, filterCriteria, data]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchParams({ query: searchValue });
  };

  const handleApplyFilter = (criteria) => {
    setFilterCriteria(criteria);
    setIsFilterVisible(false);
  };

  const handleFilterToggle = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const table = useReactTable({
    data: filteredData,
    columns: [
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: "name",
        header: "Name",
        cell: (info) => (
          <div className="flex items-center">
            <img
              src={info.row.original.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <div className="font-medium">{info.getValue()}</div>
              <div className="text-sm text-gray-500">
                @{info.row.original.firstName}
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <div className="flex items-center border-gray-300 rounded-3xl border-2 p-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span className="text-black text-xs">Active</span>
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => (
          <div className="text-sm text-black">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email Address",
        cell: (info) => (
          <div className="text-sm text-black">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("team", {
        header: "Teams",
        cell: (info) => {
          const teams = info.getValue() || "";
          return (
            <div className="flex space-x-2">
              {teams.split(",").map((team, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-purple-600 border-purple-400 border-2"
                >
                  {team.trim()}
                </span>
              ))}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex space-x-2 mr-6 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPersonToDelete(row.original);
              }}
              className="text-black"
            >
              <FaRegTrashAlt />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPersonToEdit(row.original);
                setIsEditProfileVisible(true);
              }}
              className="text-gray-600 pl-8 hover:text-gray-800"
            >
              <LuPen />
            </button>
          </div>
        ),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(10); // Set page size to 10 rows
  }, [table]);

  const handleDeleteConfirm = () => {
    setData((prevData) =>
      prevData.filter((person) => person.id !== personToDelete.id)
    );
    setPersonToDelete(null);
  };

  const handleAddMemberSave = (newMember) => {
    setData((prevData) => [...prevData, { id: Date.now(), ...newMember }]);
  };

  const handleEditProfileUpdate = (updatedPerson) => {
    setData((prevData) =>
      prevData.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
    setIsEditProfileVisible(false);
    setPersonToEdit(null);
  };

  const handleRowClick = (person) => {
    setPersonToShow(person);
    setIsShowProfileVisible(true);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-black font-semibold">
          Team members{" "}
          <span className="text-sm border-gray-300 rounded-3xl p-1 border-2 text-purple-500">
            {data.length} users
          </span>
        </h2>
        <div className="flex space-x-2">
          <div className="relative">
            <HiMagnifyingGlass className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-b-black rounded-md"
            />
          </div>
          <button
            ref={filterButtonRef}
            className="px-4 py-2 border flex items-center justify-center"
            onClick={handleFilterToggle}
          >
            <CiFilter />
          </button>
          {isFilterVisible && filterButtonRef.current && (
            <div
              className="static bg-white border rounded-md shadow-lg z-20"
              style={{
                top:
                  filterButtonRef.current.getBoundingClientRect().bottom +
                  window.scrollY +
                  5,
                left:
                  filterButtonRef.current.getBoundingClientRect().left +
                  window.scrollX,
              }}
            >
              <Filter
                onApplyFilter={handleApplyFilter}
                onClose={() => setIsFilterVisible(false)}
              />
            </div>
          )}
          <button
            onClick={() => setIsAddMemberFormVisible(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md text-semibold"
          >
            + ADD MEMBER
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-t border-b border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {cell.column.columnDef.cell
                      ? cell.column.columnDef.cell(cell)
                      : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border-black border-2 text-black px-4 py-2 rounded-md hover:bg-gray-300"
        >
          <BsArrowLeft className="inline-block" />
          <span className="ml-2">Previous</span>
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <button
              key={index}
              onClick={() => table.setPageIndex(index)}
              className={`px-3 py-1 rounded-md ${
                index === table.getState().pagination.pageIndex
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-black border-2 text-black px-4 py-2 rounded-md hover:bg-gray-300"
        >
          <span className="mr-2">Next</span>
          <BsArrowRight className="inline-block" />
        </button>
      </div>

      {isAddMemberFormVisible && (
        <AddMemberForm
          onSave={handleAddMemberSave}
          onClose={() => setIsAddMemberFormVisible(false)}
        />
      )}
      {isEditProfileVisible && personToEdit && (
        <EditProfile
          person={personToEdit}
          onUpdate={handleEditProfileUpdate}
          onClose={() => setIsEditProfileVisible(false)}
        />
      )}
      {personToDelete && (
        <DeleteMember
          person={personToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPersonToDelete(null)}
        />
      )}
      {isShowProfileVisible && personToShow && (
        <ShowProfile
          person={personToShow}
          onClose={() => setIsShowProfileVisible(false)}
        />
      )}
    </div>
  );
};

export default TeamTable;
