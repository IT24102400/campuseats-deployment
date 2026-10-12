using CampusEats.Api.Dtos;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusEats.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _svc;

    public MenuController(IMenuService svc)
    {
        _svc = svc;
    }

    // GET: /api/menu
    // Anyone can view the menu
    [HttpGet]
    public ActionResult<IEnumerable<MenuItemDto>> GetAll()
    {
        return Ok(_svc.GetAll());
    }

    // GET: /api/menu/{id}
    // Anyone can view a specific menu item
    [HttpGet("{id}")]
    public ActionResult<MenuItemDto> GetById(int id)
    {
        var item = _svc.GetById(id);

        return item is null
            ? NotFound()
            : Ok(item);
    }

    // POST: /api/menu
    // Only Admin can create menu items
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public ActionResult<MenuItemDto> Create(
        [FromBody] CreateMenuItemDto dto)
    {
        var created = _svc.Create(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created);
    }

    // PUT: /api/menu/{id}
    // Only Admin can update menu items
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Update(
        int id,
        [FromBody] CreateMenuItemDto dto)
    {
        var success = _svc.Update(id, dto);

        return success
            ? NoContent()
            : NotFound();
    }

    // DELETE: /api/menu/{id}
    // Only Admin can delete menu items
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete(int id)
    {
        var success = _svc.Delete(id);

        return success
            ? NoContent()
            : NotFound();
    }
}