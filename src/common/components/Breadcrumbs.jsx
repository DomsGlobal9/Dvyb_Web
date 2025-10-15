import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

const Breadcrumbs = ({ category, section, subcategory, productName }) => {
  const [expandedMobile, setExpandedMobile] = useState(false);

  // Build breadcrumb array based on props
  const buildBreadcrumbs = () => {
    const breadcrumbs = [{ label: 'Home', href: '/', isLink: true }];

    if (category) {
      breadcrumbs.push({
        label: category.toUpperCase(),
        href: `/products?category=${encodeURIComponent(category)}`,
        isLink: true
      });
    }

    if (section) {
      breadcrumbs.push({
        label: section,
        href: `/products?section=${encodeURIComponent(section)}`,
        isLink: true
      });
    }

    if (subcategory) {
      breadcrumbs.push({
        label: subcategory,
        href: `/products?subcategory=${encodeURIComponent(subcategory)}`, // ✅ fixed key
        isLink: true
      });
    }

    if (productName) {
      breadcrumbs.push({
        label: productName,
        href: '#',
        isLink: false
      });
    }

    // ✅ Remove duplicates by label (prevents repeated "Ethnic Wear")
    const unique = [];
    return breadcrumbs.filter(b => {
      if (unique.includes(b.label.toLowerCase())) return false;
      unique.push(b.label.toLowerCase());
      return true;
    });
  };

  const breadcrumbs = buildBreadcrumbs();
  const visibleOnMobile = expandedMobile ? breadcrumbs : breadcrumbs.slice(-2);

  const BreadcrumbItem = ({ crumb, index, isLast }) => (
    <>
      {index > 0 && (
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mx-1.5 md:mx-2 flex-shrink-0" />
      )}
      {isLast ? (
        <span className="text-xs md:text-sm text-gray-900 font-medium truncate">
          {crumb.label}
        </span>
      ) : (
        <Link
          to={crumb.href}
          className="text-xs md:text-sm text-gray-600 hover:text-[#0A95D4] transition-colors truncate"
        >
          {crumb.label}
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-white border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3.5">

        {/* Desktop View */}
        <div className="hidden sm:block">
          <ol className="flex items-center flex-wrap gap-0">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                <BreadcrumbItem
                  crumb={crumb}
                  index={index}
                  isLast={index === breadcrumbs.length - 1}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden">
          <ol className="flex items-center flex-wrap gap-0">
            {!expandedMobile && breadcrumbs.length > 2 && (
              <li className="flex items-center">
                <button
                  onClick={() => setExpandedMobile(true)}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors p-0.5"
                  title="Show more breadcrumbs"
                  aria-label="Expand breadcrumbs"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1 flex-shrink-0" />
              </li>
            )}

            {visibleOnMobile.map((crumb, index) => {
              const actualIndex = expandedMobile
                ? breadcrumbs.indexOf(crumb)
                : breadcrumbs.length - visibleOnMobile.length + index;

              return (
                <li key={index} className="flex items-center">
                  <BreadcrumbItem
                    crumb={crumb}
                    index={actualIndex}
                    isLast={actualIndex === breadcrumbs.length - 1}
                  />
                </li>
              );
            })}
          </ol>

          {/* Collapse Button */}
          {expandedMobile && breadcrumbs.length > 2 && (
            <button
              onClick={() => setExpandedMobile(false)}
              className="text-xs mt-2 font-medium transition-colors"
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
