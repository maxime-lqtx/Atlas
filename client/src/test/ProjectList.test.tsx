import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectList from "../components/ProjectList";

describe("ProjectList", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    if (typeof HTMLDialogElement !== "undefined") {
      HTMLDialogElement.prototype.showModal = vi.fn();
    }
  });

  it("affiche les projets après le chargement", async () => {
    const mockProjects = [
      {
        id: 1,
        title: "Projet Test",
        description: "Test description",
        created_at: new Date().toISOString(),
      },
    ];

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProjects,
    } as Response);

    vi.stubGlobal("fetch", mockFetch);

    render(
      <MemoryRouter>
        <ProjectList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Projet Test")).toBeInTheDocument();
    });
  });
});
